interface Notification {
    send(message: string): void;
    getChannel(): string;
}

// Concrete products
class EmailNotification implements Notification {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    send(message: string): void {
        console.log(`Invio email a ${this.email}: ${message}`);
    }

    getChannel(): string {
        return "Email";
    }
}

class SMSNotification implements Notification {
    private phoneNumber: string;

    constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    send(message: string): void {
        console.log(`Invio SMS a ${this.phoneNumber}: ${message}`);
    }

    getChannel(): string {
        return "SMS";
    }
}

// Creator interface
abstract class NotificationFactory {
    abstract createNotification(recipient: string): Notification;

    // Metodo template che usa il factory method
    sendNotification(recipient: string, message: string): void {
        const notification = this.createNotification(recipient);
        console.log(`Notifica creata per il canale: ${notification.getChannel()}`);
        notification.send(message);
    }
}

// Concrete creators
class EmailNotificationFactory extends NotificationFactory {
    createNotification(email: string): Notification {
        return new EmailNotification(email);
    }
}

class SMSNotificationFactory extends NotificationFactory {
    createNotification(phoneNumber: string): Notification {
        return new SMSNotification(phoneNumber);
    }
}

// Utilizzo
const emailFactory = new EmailNotificationFactory();
emailFactory.sendNotification("user@example.com", "Benvenuto!");

const smsFactory = new SMSNotificationFactory();
smsFactory.sendNotification("+123456789", "Benvenuto!");