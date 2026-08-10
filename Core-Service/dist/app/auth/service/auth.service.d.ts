import { SystemRole } from "../../user/enums.js";
import type { RegisterDTO } from "../dto/auth.dto.js";
export declare class AuthService {
    register: (data: RegisterDTO) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            phone: string;
            systemRole: SystemRole;
        };
    }>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map