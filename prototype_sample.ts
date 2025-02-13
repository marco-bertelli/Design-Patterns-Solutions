// Interfaccia base per il prototype
interface Prototype {
    clone(): Prototype;
    getDetails(): string;
}

// Classe concreta che implementa il prototype
class CustomDocument implements Prototype {
    private id: number;
    private type: string;
    private content: string;
    private metadata: {
        author: string;
        createdAt: Date;
        tags: string[];
    };

    constructor(
        id: number,
        type: string,
        content: string,
        author: string,
        tags: string[] = []
    ) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.metadata = {
            author,
            createdAt: new Date(),
            tags
        };
    }

    // Metodo clone per creare una copia profonda dell'oggetto
    public clone(): CustomDocument {
        const clonedDoc = new CustomDocument(
            this.id,
            this.type,
            this.content,
            this.metadata.author,
            [...this.metadata.tags]
        );
        return clonedDoc;
    }

    public getDetails(): string {
        return `Document [${this.id}] - Type: ${this.type}
        Content: ${this.content}
        Author: ${this.metadata.author}
        Created: ${this.metadata.createdAt}
        Tags: ${this.metadata.tags.join(', ')}`;
    }

    // Metodi per modificare il documento
    public setContent(content: string): void {
        this.content = content;
    }

    public addTag(tag: string): void {
        this.metadata.tags.push(tag);
    }
}

// Registry per gestire i prototipi
class DocumentRegistry {
    private prototypes: Map<string, CustomDocument> = new Map();

    public registerPrototype(type: string, prototype: CustomDocument): void {
        this.prototypes.set(type, prototype);
    }

    public createDocument(type: string): CustomDocument | null {
        const prototype = this.prototypes.get(type);

        return prototype ? prototype.clone() : null;
    }
}

// Esempio di utilizzo
const registry = new DocumentRegistry();

// Creazione dei prototipi base
const reportPrototype = new CustomDocument(1, "report", "", "System", ["report", "template"]);
const memoPrototype = new CustomDocument(2, "memo", "", "System", ["memo", "template"]);

// Registrazione dei prototipi
registry.registerPrototype("report", reportPrototype);
registry.registerPrototype("memo", memoPrototype);

// Creazione di nuovi documenti dai prototipi
const newReport = registry.createDocument("report");
if (newReport) {
    newReport.setContent("Quarterly Sales Report");
    newReport.addTag("quarterly");
    console.log(newReport.getDetails());
}

const newMemo = registry.createDocument("memo");
if (newMemo) {
    newMemo.setContent("Team Meeting Notes");
    newMemo.addTag("meeting");
    console.log(newMemo.getDetails());
}