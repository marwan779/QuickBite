export class Role {
    id;
    name;
    displayName;
    description;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.description = data.description ?? "";
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
}
//# sourceMappingURL=role.entity.js.map