export interface IEmailProvider {
    send(to: string, subject: string, html: string): Promise<void>;
}
//# sourceMappingURL=email.interface.d.ts.map