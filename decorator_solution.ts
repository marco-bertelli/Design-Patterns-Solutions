// Interfaccia Component
interface Notifier {
    send(message: string): string;
}

// ConcreteComponent - implementazione base
class BasicNotifier implements Notifier {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    send(message: string): string {
        return `EMAIL a ${this.email}: ${message}`;
    }
}

// Base Decorator
abstract class NotifierDecorator implements Notifier {
    protected wrappedNotifier: Notifier;

    constructor(notifier: Notifier) {
        this.wrappedNotifier = notifier;
    }

    send(message: string): string {
        return this.wrappedNotifier.send(message);
    }
}

// ConcreteDecorator per SMS
class SMSDecorator extends NotifierDecorator {
    private phoneNumber: string;

    constructor(notifier: Notifier, phoneNumber: string) {
        super(notifier);
        this.phoneNumber = phoneNumber;
    }

    send(message: string): string {
        return `${this.wrappedNotifier.send(message)}\nSMS a ${this.phoneNumber}: ${message}`;
    }
}

// ConcreteDecorator per Slack
class SlackDecorator extends NotifierDecorator {
    private slackChannel: string;

    constructor(notifier: Notifier, slackChannel: string) {
        super(notifier);
        this.slackChannel = slackChannel;
    }

    send(message: string): string {
        return `${this.wrappedNotifier.send(message)}\nSLACK sul canale #${this.slackChannel}: ${message}`;
    }
}

// ConcreteDecorator per logging
class LogDecorator extends NotifierDecorator {
    private sentNotifications: string[] = [];

    send(message: string): string {
        const timestamp = new Date().toISOString();
        console.log(`[LOG ${timestamp}] Invio notifica: "${message}"`);
        this.sentNotifications.push(message);
        return this.wrappedNotifier.send(message);
    }

    getSentNotifications(): string[] {
        return this.sentNotifications;
    }
}

// Esempio di utilizzo
function testNotifiers(): void {
    // Configurazione dei parametri
    const userEmail = "utente@esempio.com";
    const userPhone = "+39123456789";
    const teamChannel = "team-notifiche";

    // Notificatore base (solo email)
    const baseNotifier = new BasicNotifier(userEmail);
    console.log("=== Notifica base ===");
    console.log(baseNotifier.send("Sistema avviato"));

    // Notificatore con email + SMS
    const smsNotifier = new SMSDecorator(baseNotifier, userPhone);
    console.log("\n=== Notifica email + SMS ===");
    console.log(smsNotifier.send("Attenzione richiesta"));

    // Notificatore con email + SMS + Slack
    const teamNotifier = new SlackDecorator(smsNotifier, teamChannel);
    console.log("\n=== Notifica email + SMS + Slack ===");
    console.log(teamNotifier.send("Problema critico rilevato"));

    // Notificatore con logging + email + Slack
    const loggedNotifier = new LogDecorator(
        new SlackDecorator(new BasicNotifier(userEmail), teamChannel)
    );
    console.log("\n=== Notifica con logging ===");
    console.log(loggedNotifier.send("Test del sistema di logging"));
}

testNotifiers();