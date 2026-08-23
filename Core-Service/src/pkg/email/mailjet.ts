import Mailjet from "node-mailjet";
import type { IEmailProvider } from "./email.interface";

interface MailjetConfig {
    apiKey: string;
    secretKey: string;
    fromEmail: string;
    fromName: string;
}

export class MailjetEmailProvider implements IEmailProvider {
    private readonly client: Mailjet;

    constructor(private readonly config: MailjetConfig) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.secretKey,
        });
    }

    async send(
        to: string,
        subject: string,
        html: string
    ): Promise<void> {
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