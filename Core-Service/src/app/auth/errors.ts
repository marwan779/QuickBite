import { AppError } from "../../common/error/AppError";

export const UserAlreadyExistsError = new AppError('User Already Exists with same phone or email', 400);

export const CannotSignupAsSystemAdmin = new AppError('You cannot register as a system admin', 403);

export const InvalidRole = new AppError('Invalid role. Please provide a valid system role.', 400);
