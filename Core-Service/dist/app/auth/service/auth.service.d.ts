import { type RestaurantService } from "../../restaurant/service/restaurant.service";
import { MemberService } from "../../role-based-access-control/service/member.service";
import { SystemRole } from "../../user/enums";
import { UserService } from "../../user/service/user.service";
import type { ResetPasswordDTO, ForgetPasswordDTO, LoginDTO, RegisterDTO } from "../dto/auth.dto";
import type { MailjetEmailProvider } from "../../../pkg/email/mailjet";
export declare class AuthService {
    private readonly restaurantService;
    private readonly userService;
    private readonly memberService;
    private readonly emailProvider;
    constructor(restaurantService: RestaurantService, userService: UserService, memberService: MemberService, emailProvider: MailjetEmailProvider);
    register: (data: RegisterDTO) => Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            phone: string;
            systemRole: SystemRole;
        };
        restaurant: import("../../restaurant/entity/restaurant").RestaurantEntity | undefined;
    }>;
    login: (data: LoginDTO) => Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            phone: string;
            systemRole: SystemRole;
            createdAt: Date;
        };
    }>;
    forgetPassword: (data: ForgetPasswordDTO) => Promise<void>;
    resetPassword: (data: ResetPasswordDTO) => Promise<import("../../user/entity/user").User>;
    refresh: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    acceptInvite: (data: ResetPasswordDTO) => Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map