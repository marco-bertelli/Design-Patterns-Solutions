interface Payment {
    processPayment(amount: number): boolean;
    getPaymentMethod(): string;
}

class PayPalPayment implements Payment {
    private email: string;

    constructor(email: string) {
        if (!this.validateEmail(email)) {
            throw new Error("Invalid PayPal email");
        }
        this.email = email;
    }

    private validateEmail(email: string): boolean {
        return email.includes('@') && email.includes('.');
    }

    processPayment(amount: number): boolean {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        console.log(`Processando pagamento PayPal di €${amount} per ${this.email}`);
        return true;
    }

    getPaymentMethod(): string {
        return "PayPal";
    }
}

class CreditCardPayment implements Payment {
    private cardNumber: string;

    constructor(cardNumber: string) {
        if (!this.validateCard(cardNumber)) {
            throw new Error("Invalid card number");
        }
        this.cardNumber = cardNumber;
    }

    private validateCard(cardNumber: string): boolean {
        return cardNumber.length === 16 && /^\d+$/.test(cardNumber);
    }

    processPayment(amount: number): boolean {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        console.log(`Processando pagamento con carta ${this.maskCardNumber()} di €${amount}`);
        return true;
    }

    private maskCardNumber(): string {
        return `****-****-****-${this.cardNumber.slice(-4)}`;
    }

    getPaymentMethod(): string {
        return "Credit Card";
    }
}

abstract class PaymentFactory {
    abstract createPayment(details: string): Payment;

    // Template method
    processPayment(details: string, amount: number): boolean {
        try {
            const payment = this.createPayment(details);
            console.log(`Metodo di pagamento selezionato: ${payment.getPaymentMethod()}`);
            return payment.processPayment(amount);
        } catch (error) {
            console.error(`Errore nel processare il pagamento: ${error.message}`);
            return false;
        }
    }
}

class PayPalFactory extends PaymentFactory {
    createPayment(email: string): Payment {
        return new PayPalPayment(email);
    }
}

class CreditCardFactory extends PaymentFactory {
    createPayment(cardNumber: string): Payment {
        return new CreditCardPayment(cardNumber);
    }
}

// Test della soluzione
function testPaymentSystem() {
    const paypalFactory = new PayPalFactory();
    const creditCardFactory = new CreditCardFactory();

    try {
        // Test pagamento PayPal valido
        paypalFactory.processPayment("user@example.com", 100);

        // Test pagamento carta di credito valido
        creditCardFactory.processPayment("1234567890123456", 150);

        // Test pagamento PayPal con email invalida
        paypalFactory.processPayment("invalid-email", 100);
    } catch (error) {
        console.error("Test fallito:", error.message);
    }
}

testPaymentSystem();
