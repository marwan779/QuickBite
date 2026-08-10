export declare class PasswordReset {
    id: number;
    userId: number;
    otpHash: string;
    expiresAt: Date;
    consumedAt: Date;
    createdAt: Date;
    constructor(id: number, userId: number, otpHash: string, expiresAt: Date, consumedAt: Date, createdAt: Date);
    isExpired(): boolean;
}
//# sourceMappingURL=password-resets.d.ts.map