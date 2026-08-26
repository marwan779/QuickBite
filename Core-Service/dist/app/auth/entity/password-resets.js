// password-resets.ts
export class PasswordReset {
    id;
    userId;
    otpHash;
    expiresAt;
    consumedAt;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.userId = props.userId;
        this.otpHash = props.otpHash;
        this.expiresAt = props.expiresAt;
        this.consumedAt = props.consumedAt;
        this.createdAt = props.createdAt;
    }
    isExpired() {
        return this.expiresAt < new Date();
    }
}
//# sourceMappingURL=password-resets.js.map