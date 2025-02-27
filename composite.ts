/**
 * Pattern Composite in TypeScript
 * 
 * Il pattern Composite permette di comporre oggetti in strutture ad albero
 * per rappresentare gerarchie padre-figlio. Consente ai client di trattare
 * allo stesso modo oggetti singoli e composizioni di oggetti.
 */

// Componente: interfaccia comune per tutti gli oggetti nella composizione
interface Component {
    nome: string;
    operation(): string;
    add?(component: Component): void;
    remove?(component: Component): void;
    getChild?(index: number): Component | null;
}

// Leaf: rappresenta gli oggetti foglia che non hanno figli
class Leaf implements Component {
    constructor(public nome: string) { }

    operation(): string {
        return `Leaf ${this.nome}`;
    }
}

// Composite: rappresenta i nodi compositi che possono avere figli
class Composite implements Component {
    private children: Component[] = [];

    constructor(public nome: string) { }

    operation(): string {
        const results = [
            `Nodo composito ${this.nome}`,
            ...this.children.map(child => child.operation())
        ];
        return results.join('\n');
    }

    add(component: Component): void {
        this.children.push(component);
    }

    remove(component: Component): void {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getChild(index: number): Component | null {
        if (index >= 0 && index < this.children.length) {
            return this.children[index];
        }
        return null;
    }
}

// Esempio d'uso
function clientCode() {
    // Creiamo singoli oggetti (foglie)
    const foglia1 = new Leaf("Foglia 1");
    const foglia2 = new Leaf("Foglia 2");
    const foglia3 = new Leaf("Foglia 3");

    // Creiamo un ramo
    const ramo1 = new Composite("Ramo 1");
    ramo1.add(foglia1);
    ramo1.add(foglia2);

    // Creiamo un altro ramo
    const ramo2 = new Composite("Ramo 2");
    ramo2.add(foglia3);

    // Creiamo l'albero radice
    const tree = new Composite("Albero");
    tree.add(ramo1);
    tree.add(ramo2);

    // Il client può lavorare sia con oggetti semplici...
    console.log("Risultato foglia:");
    console.log(foglia1.operation());

    // ...sia con oggetti composti, usando la stessa interfaccia
    console.log("\nRisultato albero:");
    console.log(tree.operation());
}

clientCode();