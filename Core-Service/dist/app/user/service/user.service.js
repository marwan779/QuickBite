var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UserAlreadyExistsError } from "../../auth/errors";
import { hashPassword } from "../../auth/utils";
import { SystemRole } from "../enums";
import { UserNotFoundError } from "../errors";
import { createUser, findUserById, findUserExistsByEmailOrPhone, updateUser } from "../repository/users.repo";
import { injectable } from "tsyringe";
let UserService = class UserService {
    create = async (data, trx) => {
        const exists = await findUserExistsByEmailOrPhone(data.email, data.phone);
        if (exists) {
            throw UserAlreadyExistsError;
        }
        const passwordHash = data.password ? await hashPassword(data.password) : '';
        const now = new Date();
        return createUser({
            email: data.email,
            phone: data.phone,
            name: data.name,
            passwordHash,
            systemRole: data.systemRole,
            createdAt: now,
            updatedAt: now,
        }, trx);
    };
    getByUserId = async (userId) => {
        const user = await findUserById(userId);
        if (!user) {
            throw UserNotFoundError;
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            systemRole: user.systemRole,
        };
    };
    updateProfile = async (userId, data) => {
        const user = await findUserById(userId);
        if (!user) {
            throw UserNotFoundError;
        }
        const updated = await updateUser(userId, data);
        return {
            id: updated.id,
            email: updated.email,
            name: updated.name,
            phone: updated.phone,
            systemRole: updated.systemRole,
        };
    };
    getAgentById = async (id) => {
        const user = await findUserById(id);
        if (!user)
            throw UserNotFoundError;
        if (user.systemRole !== SystemRole.DELIVERY_AGENT) {
            // Use UserNotFoundError to avoid enumeration of other user types.
            throw UserNotFoundError;
        }
        return { id: user.id, name: user.name, phone: user.phone };
    };
};
UserService = __decorate([
    injectable()
], UserService);
export { UserService };
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map