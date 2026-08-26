import { validate, ValidationError } from "class-validator";
import { AppError } from "../error/AppError";
import { plainToInstance } from "class-transformer";
function extractValidationMessages(errors, parentPath = "") {
    const messages = [];
    for (const error of errors) {
        const path = parentPath
            ? `${parentPath}.${error.property}`
            : error.property;
        if (error.constraints) {
            messages.push(...Object.values(error.constraints).map(message => `${path}: ${message}`));
        }
        if (error.children?.length) {
            messages.push(...extractValidationMessages(error.children, path));
        }
    }
    return messages;
}
export async function validateBody(cls, body) {
    const instance = plainToInstance(cls, body);
    const errors = await validate(instance, {
        whitelist: true,
    });
    if (errors.length > 0) {
        const messages = extractValidationMessages(errors);
        throw new AppError(messages.join(", \n"), 400);
    }
    return instance;
}
//# sourceMappingURL=validate.js.map