export declare function hashPassword(password: string): Promise<string>;
export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
    restaurantId?: number;
    restaurantRole?: string;
    branchIds?: number[];
}
export declare function createAccessToken(payload: JwtPayload): string;
export declare function createRefreshToken(payload: JwtPayload): string;
export declare function comparePassword(passwordInput: string, hashedPassword: string): Promise<boolean>;
export declare function generateOTP(): string;
export declare function hashOTP(otp: string): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function verifyRefreshToken(token: string): JwtPayload;
//# sourceMappingURL=utils.d.ts.map