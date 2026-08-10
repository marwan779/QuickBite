import { authService } from "../service/auth.service.js";
import { RegisterDTO } from "../dto/auth.dto.js";
import { validateBody } from "../../../common/validation/validate.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res, next) => {
        try {
            // 1. validate req.body
            const data = await validateBody(RegisterDTO, req.body);
            // 2. call service
            const result = await this.authService.register(data);
            // 3. respond
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    };
}
export const authController = new AuthController(authService);
//# sourceMappingURL=auth.controller.js.map