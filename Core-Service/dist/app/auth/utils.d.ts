export declare function hashPassword(password: string): Promise<string>;
export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}
export declare function createAccessToken(payload: JwtPayload): string;
export declare function createRefreshToken(payload: JwtPayload): string;
//# sourceMappingURL=utils.d.ts.map