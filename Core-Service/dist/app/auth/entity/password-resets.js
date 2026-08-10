export class PasswordReset {
    id;
    userId;
    otpHash;
    expiresAt;
    consumedAt;
    createdAt;
    constructor(id, userId, otpHash, expiresAt, consumedAt, createdAt) {
        this.id = id;
        this.userId = userId;
        this.otpHash = otpHash;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.consumedAt = consumedAt;
    }
    isExpired() {
        return this.expiresAt < new Date();
    }
}
//# sourceMappingURL=password-resets.js.map