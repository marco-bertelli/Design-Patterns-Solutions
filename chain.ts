/**
 * Pattern Chain of Responsibility in TypeScript
 * 
 * Il pattern Chain of Responsibility permette di passare una richiesta lungo una catena di handler.
 * Ciascun handler decide se elaborare la richiesta o passarla al successivo handler nella catena.
 */

// Definizione della classe per le richieste
class Request {
    private type: string;
    private content: string;
    private amount: number;

    constructor(type: string, content: string, amount: number) {
        this.type = type;
        this.content = content;
        this.amount = amount;
    }

    getType(): string {
        return this.type;
    }

    getContent(): string {
        return this.content;
    }

    getAmount(): number {
        return this.amount;
    }
}

// Handler astratto: definisce l'interfaccia per la gestione delle richieste
abstract class Handler {
    private nextHandler: Handler | null = null;

    // Imposta il prossimo handler nella catena
    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        // Ritorna il nuovo handler per permettere il concatenamento
        return handler;
    }

    // Metodo template per processare la richiesta
    handle(request: Request): string {
        // Se può gestire questa richiesta, la elabora
        if (this.canHandle(request)) {
            return this.process(request);
        }
        // Altrimenti passa la richiesta al prossimo handler, se esiste
        else if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        // Se non c'è un handler successivo, ritorna un messaggio di default
        return `Nessun handler disponibile per la richiesta di tipo: ${request.getType()}`;
    }

    // Metodo astratto che verifica se questo handler può elaborare la richiesta
    protected abstract canHandle(request: Request): boolean;

    // Metodo astratto che elabora la richiesta
    protected abstract process(request: Request): string;
}

// ConcreteHandler per richieste di approvazione di spese
class ExpenseHandler extends Handler {
    private readonly approvalLimit: number;
    private readonly role: string;

    constructor(approvalLimit: number, role: string) {
        super();
        this.approvalLimit = approvalLimit;
        this.role = role;
    }

    protected canHandle(request: Request): boolean {
        return request.getType() === 'EXPENSE' && request.getAmount() <= this.approvalLimit;
    }

    protected process(request: Request): string {
        return `Spesa approvata da ${this.role} per ${request.getAmount()}€: "${request.getContent()}"`;
    }
}

// ConcreteHandler per richieste di permessi
class LeaveRequestHandler extends Handler {
    private readonly maxDays: number;
    private readonly role: string;

    constructor(maxDays: number, role: string) {
        super();
        this.maxDays = maxDays;
        this.role = role;
    }

    protected canHandle(request: Request): boolean {
        return request.getType() === 'LEAVE' && request.getAmount() <= this.maxDays;
    }

    protected process(request: Request): string {
        return `Permesso di ${request.getAmount()} giorni approvato da ${this.role}: "${request.getContent()}"`;
    }
}

// ConcreteHandler per richieste tecniche
class TechnicalRequestHandler extends Handler {
    private readonly supportedRequests: string[];
    private readonly team: string;

    constructor(supportedRequests: string[], team: string) {
        super();
        this.supportedRequests = supportedRequests;
        this.team = team;
    }

    protected canHandle(request: Request): boolean {
        return request.getType() === 'TECHNICAL' &&
            this.supportedRequests.some(type => request.getContent().includes(type));
    }

    protected process(request: Request): string {
        return `Richiesta tecnica gestita dal team ${this.team}: "${request.getContent()}"`;
    }
}

// Utilizzo del pattern
function clientCode() {
    // Creazione dei diversi handler nella catena
    const teamLeader = new ExpenseHandler(1000, "Team Leader");
    const manager = new ExpenseHandler(5000, "Manager");
    const director = new ExpenseHandler(20000, "Direttore");

    const hrAssistant = new LeaveRequestHandler(3, "Assistente HR");
    const hrManager = new LeaveRequestHandler(10, "Manager HR");

    const frontendTeam = new TechnicalRequestHandler(["UI", "Frontend", "CSS"], "Frontend");
    const backendTeam = new TechnicalRequestHandler(["Database", "API", "Server"], "Backend");
    const devOpsTeam = new TechnicalRequestHandler(["Deployment", "CI/CD", "Cloud"], "DevOps");

    // Collegamento della catena per le spese
    teamLeader.setNext(manager).setNext(director);

    // Collegamento della catena per i permessi
    hrAssistant.setNext(hrManager);

    // Collegamento della catena per le richieste tecniche
    frontendTeam.setNext(backendTeam).setNext(devOpsTeam);

    // Creazione di alcune richieste
    const expenseSmall = new Request("EXPENSE", "Materiale ufficio", 500);
    const expenseMedium = new Request("EXPENSE", "Nuovo laptop", 2500);
    const expenseLarge = new Request("EXPENSE", "Conferenza internazionale", 15000);
    const expenseHuge = new Request("EXPENSE", "Ristrutturazione uffici", 50000);

    const leaveShort = new Request("LEAVE", "Visita medica", 2);
    const leaveLong = new Request("LEAVE", "Vacanza", 7);
    const leaveVeryLong = new Request("LEAVE", "Aspettativa", 20);

    const technicalFrontend = new Request("TECHNICAL", "Bug nella UI del form di login", 0);
    const technicalBackend = new Request("TECHNICAL", "Errore nell'API di autenticazione", 0);
    const technicalDevOps = new Request("TECHNICAL", "Problema nel Deployment su AWS", 0);
    const technicalUnknown = new Request("TECHNICAL", "Problema non categorizzato", 0);

    // Elaborazione delle richieste
    console.log("=== Richieste di spesa ===");
    console.log(teamLeader.handle(expenseSmall));
    console.log(teamLeader.handle(expenseMedium));
    console.log(teamLeader.handle(expenseLarge));
    console.log(teamLeader.handle(expenseHuge));

    console.log("\n=== Richieste di permesso ===");
    console.log(hrAssistant.handle(leaveShort));
    console.log(hrAssistant.handle(leaveLong));
    console.log(hrAssistant.handle(leaveVeryLong));

    console.log("\n=== Richieste tecniche ===");
    console.log(frontendTeam.handle(technicalFrontend));
    console.log(frontendTeam.handle(technicalBackend));
    console.log(frontendTeam.handle(technicalDevOps));
    console.log(frontendTeam.handle(technicalUnknown));
}

clientCode();