class Email {
    private to: string[];
    private cc: string[];
    private subject: string;
    private body: string;
    private attachments: string[];
    private priority: 'high' | 'normal' | 'low';

    constructor(builder: EmailBuilder) {
        this.to = builder.to;
        this.cc = builder.cc;
        this.subject = builder.subject;
        this.body = builder.body;
        this.attachments = builder.attachments;
        this.priority = builder.priority;
    }

    public send(): void {
        console.log(`
            Sending email:
            To: ${this.to.join(', ')}
            CC: ${this.cc.join(', ')}
            Subject: ${this.subject}
            Priority: ${this.priority}
            Attachments: ${this.attachments.length}
            Body: ${this.body}
        `);
    }
}

class EmailBuilder {
    to: string[] = [];
    cc: string[] = [];
    subject: string = '';
    body: string = '';
    attachments: string[] = [];
    priority: 'high' | 'normal' | 'low' = 'normal';

    addTo(email: string): EmailBuilder {
        this.to.push(email);
        return this;
    }

    addCC(email: string): EmailBuilder {
        this.cc.push(email);
        return this;
    }

    setSubject(subject: string): EmailBuilder {
        this.subject = subject;
        return this;
    }

    setBody(body: string): EmailBuilder {
        this.body = body;
        return this;
    }

    addAttachment(filename: string): EmailBuilder {
        this.attachments.push(filename);
        return this;
    }

    setPriority(priority: 'high' | 'normal' | 'low'): EmailBuilder {
        this.priority = priority;
        return this;
    }

    build(): Email {
        if (this.to.length === 0) {
            throw new Error('Email must have at least one recipient');
        }
        if (!this.subject) {
            throw new Error('Email must have a subject');
        }
        return new Email(this);
    }
}

// Utilizzo
const email = new EmailBuilder()
    .addTo("user@example.com")
    .addCC("manager@example.com")
    .setSubject("Meeting Notes")
    .setBody("Here are the meeting notes...")
    .addAttachment("notes.pdf")
    .setPriority("high")
    .build();

email.send();