import {AppError} from "../../common/error/AppError";

export const CannotCreateOwnerUserError = new AppError('Not allowed to create another owner', 400);
export const RoleNotFoundError = new AppError('Role not found', 404);
export const MemberNotFoundError = new AppError('Member not found', 404);
export const CannotDeleteOwnerError = new AppError('Cannot delete the restaurant owner', 400);
export const NotAuthorizedErrorToManageRestaurant = new AppError('You are not authorized to manage this restaurant', 403);
export const NotAuthorizedErrorToManageBranches = new AppError('You are not authorized to manage these branches', 403);

