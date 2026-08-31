import amqp from "amqp-connection-manager";
/**
 * Producer-side wrapper built on amqp-connection-manager. The library handles
 * auto-reconnect, channel re-creation, and buffering publishes while
 * disconnected. Confirm channel → publish() waits for the broker ACK.
 */
export class RabbitMQClient {
    config;
    connection = null;
    channel = null;
    constructor(config) {
        this.config = config;
    }
    async connect() {
        if (this.connection)
            return;
        this.connection = amqp.connect([this.config.url], {
            reconnectTimeInSeconds: Math.max(1, Math.round((this.config.reconnectInitialMs ?? 500) / 1000)),
        });
        this.channel = this.connection.createChannel({ json: false });
        await this.channel.waitForConnect();
    }
    async close() {
        try {
            if (this.channel)
                await this.channel.close();
        }
        catch { }
        try {
            if (this.connection)
                await this.connection.close();
        }
        catch { }
        this.channel = null;
        this.connection = null;
    }
    async declareExchange(exchange) {
        if (!this.channel)
            await this.connect();
        await this.channel.addSetup((ch) => ch.assertExchange(exchange, "topic", { durable: true }));
    }
    async publishConfirmed(exchange, routingKey, body) {
        if (!this.channel)
            await this.connect();
        await this.channel.publish(exchange, routingKey, body, {
            persistent: true,
            contentType: "application/json",
        });
    }
}
//# sourceMappingURL=rabbitmq.client.js.map