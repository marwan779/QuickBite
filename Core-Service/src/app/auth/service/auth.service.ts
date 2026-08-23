import { db } from "../../../lib/knex/knex";
import { type RestaurantService } from "../../restaurant/service/restaurant.service";
import { findBranchIdsByMemberId } from "../../role-based-access-control/repository/member-branch.repo";
import { activateMemberByUserId, findRestaurantMemberWithRole } from "../../role-based-access-control/repository/restaurant_member.repo";
import { MemberService } from "../../role-based-access-control/service/member.service";
import { SystemRole } from "../../user/enums";
import { findUserByEmail, updateUserPassword } from "../../user/repository/users.repo";
import { UserService } from "../../user/service/user.service";
import type { ResetPasswordDTO, ForgetPasswordDTO, LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { CannotSignupAsSystemAdmin, InvalidRole, IncorrectCredentials, InvalidOTPError, InvalidRefreshTokenError, RestaurantDataRequiredError } from "../errors";
import { createPasswordReset, findLatestPasswordResetByUserId, updatePasswordResetConsumedAt } from "../repository/password-reset.repo";
import { comparePassword, createAccessToken, createRefreshToken, generateOTP, hashOTP, hashPassword, verifyRefreshToken } from "../utils";
import { TOKENS } from "../../../lib/di/tokens";
import { injectable, inject } from "tsyringe";
import type { MailjetEmailProvider } from "../../../pkg/email/mailjet";
import { passwordResetEmail } from "../templates/password-reset";

@injectable()
export class AuthService {

    constructor(@inject(TOKENS.RestaurantService) private readonly restaurantService: RestaurantService,
        @inject(TOKENS.UserService) private readonly userService: UserService,
        @inject(TOKENS.MemberService) private readonly memberService: MemberService,
        @inject(TOKENS.EmailProvider) private readonly emailProvider: MailjetEmailProvider) {
    }

    register = async (data: RegisterDTO) => {
        if (data.role == SystemRole.SYSTEM_ADMIN) {
            throw CannotSignupAsSystemAdmin;
        }
        if (!Object.values(SystemRole).includes(data.role as SystemRole)) {
            throw InvalidRole;
        }

        const trx = await db.transaction();
        let user;
        let restaurant;

        // Define outside the try block so it's accessible when building the JWT payload
        let restaurantMemberInfo = null;

        try {
            // 1. Centralize user creation
            // (Duplicate checks, password hashing, and DB insertion are now handled in UserService)
            user = await this.userService.create({
                email: data.email,
                phone: data.phone,
                name: data.name,
                password: data.password,
                systemRole: data.role as SystemRole,
            }, trx);

            // 2. Handle restaurant specific creation logic
            if (data.role == SystemRole.RESTAURANT_USER) {
                if (data.restaurant == undefined) {
                    throw RestaurantDataRequiredError;
                }

                // Create the restaurant
                restaurant = await this.restaurantService.create(user.id, data.restaurant, trx);

                // Create the missing owner member record (Homework Fix)
                await this.memberService.createOwnerMember(restaurant.id, user.id, trx);

                // Build the extra JWT payload info
                restaurantMemberInfo = {
                    restaurantId: restaurant.id,
                    restaurantRole: 'owner',
                    branchIds: []
                };
            }

            await trx.commit();
        } catch (error) {
            await trx.rollback();
            throw error;
        }

        // 3. Create access token & refresh token, spreading in the restaurant info if it exists
        const payload = {
            userId: user.id,
            role: data.role,
            email: user.email,
            ...(restaurantMemberInfo && restaurantMemberInfo)
        };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);

        // 4. Return tokens and user data
        return {
            message: "successfully registered user",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                systemRole: user.systemRole,
            },
            restaurant
        };
    }


    login = async (data: LoginDTO) => {
        // find the user by email input
        const user = await findUserByEmail(data.email);
        if (!user) {
            throw IncorrectCredentials
        }
        // compare passwords
        const match = await comparePassword(data.password, user.passwordHash)
        // if passwords doesnt match throw err
        if (!match) {
            throw IncorrectCredentials
        }


        let restaurantMemberInfo = null
        if (user.systemRole == SystemRole.RESTAURANT_USER) {
            const memberData = await findRestaurantMemberWithRole(user.id);
            const branchIds = await findBranchIdsByMemberId(memberData.member.id);
            if (memberData) {
                restaurantMemberInfo = {
                    restaurantId: memberData.member.restaurantId,
                    restaurantRole: memberData.roleName,
                    branchIds
                }
            }
        }


        // generate tokens
        const payload = { userId: user.id, role: user.systemRole, email: user.email, ...restaurantMemberInfo };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);
        // return the data
        return {
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                systemRole: user.systemRole,
                createdAt: user.createdAt,
            }

        }
    }

    forgetPassword = async (data: ForgetPasswordDTO) => {
        // check if user exists
        const user = await findUserByEmail(data.email);
        if (!user) {
            return
        }
        // generate an otp
        const otp = generateOTP();
        // hash the otp
        const hashedOtp = hashOTP(otp);
        // insert the otp
        await createPasswordReset({
            userId: user.id,
            otpHash: hashedOtp,
            expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
            createdAt: new Date(),
        },
        )
        // send email

        const email = passwordResetEmail(otp);

        await this.emailProvider.send(
            data.email,
            email.subject,
            email.html,
        );
    }

    resetPassword = async (data: ResetPasswordDTO) => {
        // find user
        const user = await findUserByEmail(data.email);
        if (!user) {
            throw InvalidOTPError
        }
        // find reset password
        const reset = await findLatestPasswordResetByUserId(user.id);
        if (!reset) {
            throw InvalidOTPError
        }
        // verify otp and expiry date
        const inputOTPHash = hashOTP(data.otp)

        if (inputOTPHash != reset.otpHash || reset.isExpired()) {
            throw InvalidOTPError
        }
        // update user password
        const hashedPassword = await hashPassword(data.newPassword);
        await updateUserPassword(user.id, hashedPassword);
        // update reset password
        await updatePasswordResetConsumedAt(reset.id)

        return user;
    }



    refresh = async (refreshToken: string) => {
        try {
            const payload = verifyRefreshToken(refreshToken);

            const accessToken = createAccessToken({
                userId: payload.userId,
                email: payload.email,
                role: payload.role,
            });

            return {
                accessToken,
            };
        } catch (err) {
            throw InvalidRefreshTokenError;
        }
    }

    acceptInvite = async (data: ResetPasswordDTO) => {
        const user = await this.resetPassword(data)
        // activate member
        await activateMemberByUserId(user.id)
    }
}





