export class Logger {
    static instance;
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }
    log(level, message, metadata = {}) {
        const logObject = {
            level: level,
            message: message,
            timestamp: Date.now(),
            ...metadata
        };
        // This could call datadog logger
        console.log(JSON.stringify(logObject));
    }
    info(message, metadata = {}) {
        this.log('info', message, metadata);
    }
    error(message, metadata = {}) {
        this.log('error', message, metadata);
    }
    warn(message, metadata = {}) {
        this.log('warn', message, metadata);
    }
    debug(message, metadata = {}) {
        this.log('debug', message, metadata);
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map