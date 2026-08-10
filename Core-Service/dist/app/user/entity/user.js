export class User {
    id;
    email;
    phone;
    name;
    passwordHash;
    systemRole;
    deletedAt;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.phone = data.phone;
        this.name = data.name;
        this.passwordHash = data.passwordHash;
        this.systemRole = data.systemRole;
        this.deletedAt = data.deletedAt ?? null;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
}
//# sourceMappingURL=user.js.map