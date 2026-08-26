import { SystemRole } from "../../user/enums";
export declare class RegisterDTO {
    email: string;
    phone: string;
    name: string;
    password: string;
    role: SystemRole;
    restaurant?: RegisterRestaurantDTO;
}
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class ForgetPasswordDTO {
    email: string;
}
export declare class ResetPasswordDTO {
    email: string;
    otp: string;
    newPassword: string;
}
export declare class RegisterRestaurantDTO {
    name: string;
    logoURL?: string;
    primaryCountry: string;
}
//# sourceMappingURL=auth.dto.d.ts.map