export class Permission {
    id;
    resource;
    action;
    createdAt;
    constructor(data) {
        this.id = data.id;
        this.resource = data.resource;
        this.action = data.action;
        this.createdAt = data.createdAt ?? new Date();
    }
}
//# sourceMappingURL=permission.entity.js.map