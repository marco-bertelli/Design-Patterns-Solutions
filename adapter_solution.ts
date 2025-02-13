// Sistema di notifiche esistente
interface GameNotification {
    sendNotification(userId: string, message: string): Promise<boolean>;
}

// Sistema di notifiche push di terze parti
class PushService {
    public async sendPushAlert(
        recipientToken: string,
        title: string,
        body: string,
        priority: number
    ): Promise<{ success: boolean; messageId: string }> {
        // Simulazione invio notifica push
        console.log(`Sending push notification:
            Token: ${recipientToken}
            Title: ${title}
            Body: ${body}
            Priority: ${priority}`);

        return {
            success: true,
            messageId: Math.random().toString(36).substring(7)
        };
    }
}

// Adapter per il sistema di notifiche push
class PushNotificationAdapter implements GameNotification {
    private pushService: PushService;
    private tokenMap: Map<string, string>;
    private retryAttempts: number;

    constructor(pushService: PushService, retryAttempts: number = 3) {
        this.pushService = pushService;
        this.retryAttempts = retryAttempts;

        // Simulazione mapping userId -> token
        this.tokenMap = new Map([
            ['user1', 'token_xyz_1'],
            ['user2', 'token_xyz_2']
        ]);
    }

    public async sendNotification(userId: string, message: string): Promise<boolean> {
        try {
            const token = this.getTokenForUser(userId);
            const result = await this.sendWithRetry(token, message);

            this.logNotification(userId, message, result);
            return result.success;
        } catch (error) {
            console.error(`Failed to send notification to ${userId}:`, error);
            return false;
        }
    }

    private getTokenForUser(userId: string): string {
        const token = this.tokenMap.get(userId);
        if (!token) {
            throw new Error(`No token found for user ${userId}`);
        }
        return token;
    }

    private async sendWithRetry(
        token: string,
        message: string
    ): Promise<{ success: boolean; messageId: string }> {
        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                return await this.pushService.sendPushAlert(
                    token,
                    'Game Notification',
                    message,
                    this.getPriorityForMessage(message)
                );
            } catch (error) {
                lastError = error as Error;
                if (attempt === this.retryAttempts) {
                    throw lastError;
                }
                // Attesa esponenziale tra i tentativi
                await new Promise(resolve =>
                    setTimeout(resolve, Math.pow(2, attempt) * 1000)
                );
            }
        }

        throw lastError;
    }

    private getPriorityForMessage(message: string): number {
        // Logica per determinare la priorità basata sul contenuto
        if (message.includes('URGENT') || message.includes('IMPORTANT')) {
            return 1; // Alta priorità
        }
        return 3; // Priorità normale
    }

    private logNotification(
        userId: string,
        message: string,
        result: { success: boolean; messageId: string }
    ): void {
        console.log(`
            Notification Log:
            User ID: ${userId}
            Message: ${message}
            Status: ${result.success ? 'Delivered' : 'Failed'}
            Message ID: ${result.messageId}
            Timestamp: ${new Date().toISOString()}
        `);
    }
}

// Demo di utilizzo
async function testNotificationSystem() {
    // Creiamo le istanze necessarie
    const pushService = new PushService();
    const notificationAdapter = new PushNotificationAdapter(pushService);

    // Test notifica normale
    console.log('Sending normal notification...');
    await notificationAdapter.sendNotification(
        'user1',
        'Your daily reward is ready!'
    );

    // Test notifica urgente
    console.log('\nSending urgent notification...');
    await notificationAdapter.sendNotification(
        'user2',
        'URGENT: Your kingdom is under attack!'
    );

    // Test utente non esistente
    console.log('\nTesting error handling...');
    try {
        await notificationAdapter.sendNotification(
            'nonexistent',
            'This should fail'
        );
    } catch (error) {
        console.error('Expected error occurred:', error);
    }
}

// Esecuzione del test
testNotificationSystem();