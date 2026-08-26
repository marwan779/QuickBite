export class RestaurantEntity {
    id;
    ownerId;
    name;
    logoURL;
    status;
    primaryCountry;
    createdAt;
    updatedAt;
    statusUpdatedAt;
    constructor(data) {
        this.id = data.id;
        this.ownerId = data.ownerId;
        this.name = data.name;
        this.logoURL = data.logoURL ?? "";
        this.status = data.status;
        this.primaryCountry = data.primaryCountry;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
        this.statusUpdatedAt = data.statusUpdatedAt ?? new Date();
    }
}
//# sourceMappingURL=restaurant.js.map