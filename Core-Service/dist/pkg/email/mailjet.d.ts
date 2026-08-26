import type { IEmailProvider } from "./email.interface";
interface MailjetConfig {
    apiKey: string;
    secretKey: string;
    fromEmail: string;
    fromName: string;
}
export declare class MailjetEmailProvider implements IEmailProvider {
    private readonly config;
    private readonly client;
    constructor(config: MailjetConfig);
    send(to: string, subject: string, html: string): Promise<void>;
}
export {};
//# sourceMappingURL=mailjet.d.ts.map