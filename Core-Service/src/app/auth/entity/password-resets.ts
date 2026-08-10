// password-resets.ts

export interface PasswordResetProps {
    id: number;
    userId: number;
    otpHash: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
}

export class PasswordReset {
    id: number;
    userId: number;
    otpHash: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;

    constructor(props: PasswordResetProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.otpHash = props.otpHash;
        this.expiresAt = props.expiresAt;
        this.consumedAt = props.consumedAt;
        this.createdAt = props.createdAt;
    }

    isExpired(): boolean {
        return this.expiresAt < new Date();
    }
}