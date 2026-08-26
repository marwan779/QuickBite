export interface PasswordResetProps {
    id: number;
    userId: number;
    otpHash: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
}
export declare class PasswordReset {
    id: number;
    userId: number;
    otpHash: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
    constructor(props: PasswordResetProps);
    isExpired(): boolean;
}
//# sourceMappingURL=password-resets.d.ts.map