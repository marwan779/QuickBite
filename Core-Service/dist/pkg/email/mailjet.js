import Mailjet from "node-mailjet";
export class MailjetEmailProvider {
    config;
    client;
    constructor(config) {
        this.config = config;
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.secretKey,
        });
    }
    async send(to, subject, html) {
        await this.client
            .post("send", { version: "v3.1" })
            .request({
            Messages: [
                {
                    From: {
                        Email: this.config.fromEmail,
                        Name: this.config.fromName,
                    },
                    To: [
                        {
                            Email: to,
                        },
                    ],
                    Subject: subject,
                    HTMLPart: html,
                },
            ],
        });
    }
}
//# sourceMappingURL=mailjet.js.map