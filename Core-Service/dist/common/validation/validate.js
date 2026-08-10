import { validate } from "class-validator";
import { AppError } from "../error/AppError";
export async function validateBody(cls, body) {
    // const register = new DTO(body)
    const instance = Object.assign(new cls(), body); // dto: {email, phone, password} , body: {email, phone, system_role}
    const errors = await validate(instance, { whitelist: true });
    if (errors.length > 0) {
        const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
        throw new AppError(messages.join(', \n'), 400);
    }
    return instance;
}
//# sourceMappingURL=validate.js.map