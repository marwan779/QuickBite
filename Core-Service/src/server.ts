import "reflect-metadata"
import http from "http"
import { createApp } from './app'
import { env } from './lib/config/env'
import { db } from './lib/knex/knex'

const app = createApp()
const server = http.createServer(app);

server.listen(env.port, (): void => {
    console.log(`Server listening on ${env.port}`);
})

async function shutdown() {
    server.close(async (): Promise<never> => {
        await db.destroy();
        console.log("database shutdown");
        process.exit(0);
    })
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);