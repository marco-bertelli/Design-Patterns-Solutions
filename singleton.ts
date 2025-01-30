enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

interface LogMessage {
    timestamp: Date;
    level: LogLevel;
    message: string;
}

class Logger {
    private static instance: Logger;
    private logs: LogMessage[] = [];

    private constructor() {
        // Costruttore privato
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(level: LogLevel, message: string): void {
        const logMessage: LogMessage = {
            timestamp: new Date(),
            level,
            message
        };
        this.logs.push(logMessage);
    }

    public getLogs(): LogMessage[] {
        return [...this.logs];
    }

    public getLogsByLevel(level: LogLevel): LogMessage[] {
        return this.logs.filter(log => log.level === level);
    }

    public clearLogs(): void {
        this.logs = [];
    }
}

// Test della soluzione
function testLogger() {
    const logger = Logger.getInstance();

    logger.log(LogLevel.INFO, "Applicazione avviata");
    logger.log(LogLevel.WARNING, "Memoria in esaurimento");
    logger.log(LogLevel.ERROR, "Errore critico nel sistema");

    console.log("Tutti i log:", logger.getLogs());
    console.log("Solo errori:", logger.getLogsByLevel(LogLevel.ERROR));

    // Verifica che sia effettivamente un singleton
    const logger2 = Logger.getInstance();
    console.log("È lo stesso logger?", logger === logger2); // true
}

testLogger();