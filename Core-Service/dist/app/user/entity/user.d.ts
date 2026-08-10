import type { SystemRole } from "../enums";
export declare class User {
    id: number;
    email: string;
    phone: string;
    name: string;
    passwordHash: string;
    systemRole: SystemRole;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(data: Partial<User>);
}
//# sourceMappingURL=user.d.ts.map