import { config } from 'dotenv';
import path from 'path';
import { z } from 'zod';


config({
    path: path.resolve(import.meta.dirname, "../../../.env")
});


const schema = z.object({
    PORT: z.string().default("3000"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.string().default("5432"),
    DB_USERNAME: z.string().default("postgres"),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_POOL_MAX: z.string().default('10'),
    DB_MIGRATION_DIRECTORY: z.string().default("src/migrations"),
    DB_MIGRATION_EXTENSION: z.string().default("ts"),
    ACCESS_SECRET: z.string(),
    REFRESH_SECRET: z.string(),
    ACCESS_EXPIRES_IN: z.string(),
    REFRESH_EXPIRES_IN: z.string(),
});

const parsed = schema.parse(process.env);

export const env = {
    port: Number(parsed.PORT),
    db: {
        host: parsed.DB_HOST,
        port: Number(parsed.DB_PORT),
        username: parsed.DB_USERNAME,
        password: parsed.DB_PASSWORD,
        name: parsed.DB_NAME,
        poolMax: Number(parsed.DB_POOL_MAX),

        migrationDirectory: path.resolve(
            import.meta.dirname,
            "../../migrations"
        ),
        MigrationExtension: parsed.DB_MIGRATION_EXTENSION,
    },
    jwt: {
        refreshSecret: parsed.REFRESH_SECRET,
        accessSecret: parsed.ACCESS_SECRET,
        accessExpiresIn: parsed.ACCESS_EXPIRES_IN,
        refreshExpiresIn: parsed.REFRESH_EXPIRES_IN,
    }

}
