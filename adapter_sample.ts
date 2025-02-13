// Interfaccia moderna che il nostro sistema usa
interface ModernPaymentProcessor {
    processPayment(amount: number, currency: string): Promise<boolean>;
    refundPayment(transactionId: string): Promise<boolean>;
    getBalance(): Promise<number>;
}

// Sistema legacy che dobbiamo integrare
class LegacyPaymentSystem {
    private balance: number = 1000;

    public makePayment(value: number): boolean {
        if (value <= this.balance) {
            this.balance -= value;
            console.log(`Legacy payment processed: ${value}`);
            return true;
        }
        return false;
    }

    public returnPayment(value: number): boolean {
        this.balance += value;
        console.log(`Legacy payment returned: ${value}`);
        return true;
    }

    public checkBalance(): number {
        return this.balance;
    }
}

// Adapter che converte il sistema legacy nel formato moderno
class PaymentSystemAdapter implements ModernPaymentProcessor {
    private legacySystem: LegacyPaymentSystem;
    private exchangeRates: Map<string, number>;

    constructor(legacySystem: LegacyPaymentSystem) {
        this.legacySystem = legacySystem;
        // Esempio di tassi di cambio
        this.exchangeRates = new Map([
            ['USD', 1],
            ['EUR', 0.85],
            ['GBP', 0.73]
        ]);
    }

    public async processPayment(amount: number, currency: string): Promise<boolean> {
        const convertedAmount = this.convertToUSD(amount, currency);
        return new Promise((resolve) => {
            const result = this.legacySystem.makePayment(convertedAmount);
            resolve(result);
        });
    }

    public async refundPayment(transactionId: string): Promise<boolean> {
        // Nel sistema legacy non abbiamo il concetto di transactionId
        // quindi dobbiamo gestirlo diversamente
        return new Promise((resolve) => {
            const result = this.legacySystem.returnPayment(100); // esempio semplificato
            resolve(result);
        });
    }

    public async getBalance(): Promise<number> {
        return new Promise((resolve) => {
            const balance = this.legacySystem.checkBalance();
            resolve(balance);
        });
    }

    private convertToUSD(amount: number, fromCurrency: string): number {
        const rate = this.exchangeRates.get(fromCurrency) || 1;
        return amount * (1 / rate);
    }
}

// Sistema moderno che usa il nuovo formato
class ModernPaymentService {
    private paymentProcessor: ModernPaymentProcessor;

    constructor(processor: ModernPaymentProcessor) {
        this.paymentProcessor = processor;
    }

    public async makePayment(amount: number, currency: string): Promise<void> {
        try {
            const result = await this.paymentProcessor.processPayment(amount, currency);
            if (result) {
                console.log(`Payment of ${amount} ${currency} processed successfully`);
            } else {
                console.log(`Payment failed`);
            }
        } catch (error) {
            console.error(`Error processing payment:`, error);
        }
    }
}

// Esempio di utilizzo
async function demonstratePaymentSystem() {
    // Creiamo il sistema legacy
    const legacySystem = new LegacyPaymentSystem();

    // Creiamo l'adapter
    const adapter = new PaymentSystemAdapter(legacySystem);

    // Creiamo il servizio moderno che usa l'adapter
    const modernService = new ModernPaymentService(adapter);

    // Usiamo il sistema moderno che internamente usa il sistema legacy attraverso l'adapter
    await modernService.makePayment(100, 'EUR');
    await modernService.makePayment(50, 'USD');

    // Verifichiamo il bilancio
    const balance = await adapter.getBalance();
    console.log(`Current balance: ${balance}`);
}

// Eseguiamo la dimostrazione
demonstratePaymentSystem();