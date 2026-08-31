export declare const env: {
    port: number;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
        poolMax: number;
        migrationDirectory: string;
        migrationExtension: string;
    };
    jwt: {
        refreshSecret: string;
        accessSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    isProduction: boolean;
    cors: {
        origins: string[];
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    mailjet: {
        apiKey: string;
        secretKey: string;
        fromEmail: string;
        fromName: string;
    };
    internal: {
        apiKey: string;
    };
    rabbit: {
        url: string;
        exchange: string;
        drainCron: string;
        batchSize: number;
    };
};
//# sourceMappingURL=env.d.ts.map