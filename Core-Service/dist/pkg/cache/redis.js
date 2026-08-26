import Redis from "ioredis";
export class RedisCacheProvider {
    client;
    constructor(config) {
        this.client = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxRetriesPerRequest: 3
        });
        this.client.on("error", (err) => { console.error("Redis Error:", err.message); });
        this.client.connect().catch((err) => { console.error("Redis Connect Error:", err); });
    }
    async set(key, value, ttlSeconds) {
        if (ttlSeconds) {
            await this.client.set(key, value, "EX", ttlSeconds);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async get(key) {
        return this.client.get(key);
    }
    async del(key) {
        return this.client.del(key);
    }
}
//# sourceMappingURL=redis.js.map