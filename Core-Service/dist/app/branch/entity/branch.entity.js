export class Branch {
    id;
    restaurantId;
    countryCode;
    addressText;
    label;
    lat;
    lng;
    isActive;
    opensAt;
    closesAt;
    acceptOrders;
    createdAt;
    updatedAt;
    deliveryRadius; // km
    currency;
    commission;
    location;
    constructor(data) {
        this.id = data.id;
        this.restaurantId = data.restaurantId;
        this.countryCode = data.countryCode;
        this.addressText = data.addressText;
        this.label = data.label;
        this.lat = data.lat;
        this.lng = data.lng;
        this.isActive = data.isActive;
        this.opensAt = data.opensAt;
        this.closesAt = data.closesAt;
        this.acceptOrders = data.acceptOrders;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
        this.deliveryRadius = data.deliveryRadius ?? 0;
        this.currency = data.currency;
        this.commission = data.commission ?? 0;
    }
}
//# sourceMappingURL=branch.entity.js.map