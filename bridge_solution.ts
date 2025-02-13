// Interfaccia per gli attacchi magici
interface AttaccoMagico {
    eseguiAttacco(): string;
    getEffettoSpeciale(): string;
    getSuono(): string;
}

// Implementazioni degli attacchi magici
class AttaccoFuoco implements AttaccoMagico {
    eseguiAttacco(): string {
        return "fiamme ardenti";
    }

    getEffettoSpeciale(): string {
        return "Il nemico brucia per 3 turni! 🔥";
    }

    getSuono(): string {
        return "WOOSH! 🔥";
    }
}

class AttaccoGhiaccio implements AttaccoMagico {
    eseguiAttacco(): string {
        return "cristalli di ghiaccio";
    }

    getEffettoSpeciale(): string {
        return "Il nemico è congelato! ❄️";
    }

    getSuono(): string {
        return "FREEZE! ❄️";
    }
}

class AttaccoFulmine implements AttaccoMagico {
    eseguiAttacco(): string {
        return "saette elettriche";
    }

    getEffettoSpeciale(): string {
        return "Il nemico è paralizzato! ⚡";
    }

    getSuono(): string {
        return "ZAP! ⚡";
    }
}

// Classe base per i personaggi
abstract class Personaggio {
    protected attaccoMagico: AttaccoMagico;
    protected livelloFelicità: number = 100;

    constructor(attaccoMagico: AttaccoMagico) {
        this.attaccoMagico = attaccoMagico;
    }

    cambiaAttacco(nuovoAttacco: AttaccoMagico): void {
        this.attaccoMagico = nuovoAttacco;
        console.log("Wow! Nuovo potere sbloccato! 🎉");
    }

    abstract attacca(): void;

    balletto(): void {
        console.log("*Fa una danzetta felice* 💃");
        this.livelloFelicità += 10;
    }
}

// Implementazioni dei personaggi
class Guerriero extends Personaggio {
    attacca(): void {
        console.log(`
            Il Guerriero possente carica con la sua spada di ${this.attaccoMagico.eseguiAttacco()}!
            ${this.attaccoMagico.getSuono()}
            ${this.attaccoMagico.getEffettoSpeciale()}
            Livello di felicità: ${this.livelloFelicità} 😊
        `);
    }
}

class Mago extends Personaggio {
    attacca(): void {
        console.log(`
            Il Mago agita il suo bastone e lancia ${this.attaccoMagico.eseguiAttacco()}!
            ${this.attaccoMagico.getSuono()}
            ${this.attaccoMagico.getEffettoSpeciale()}
            Livello di felicità: ${this.livelloFelicità} 🧙‍♂️
        `);
    }
}

class Arciere extends Personaggio {
    attacca(): void {
        console.log(`
            L'Arciere scocca una freccia circondata da ${this.attaccoMagico.eseguiAttacco()}!
            ${this.attaccoMagico.getSuono()}
            ${this.attaccoMagico.getEffettoSpeciale()}
            Livello di felicità: ${this.livelloFelicità} 🏹
        `);
    }
}

// Test divertente
function avventuraDivertente(): void {
    console.log("🎮 Inizia l'avventura più divertente di sempre! 🎮\n");

    const guerriero = new Guerriero(new AttaccoFuoco());
    const mago = new Mago(new AttaccoGhiaccio());
    const arciere = new Arciere(new AttaccoFulmine());

    // Test degli attacchi base
    guerriero.attacca();
    guerriero.balletto();

    // Cambio di attacco a runtime
    console.log("\n🔄 Il guerriero trova un nuovo potere magico!\n");
    guerriero.cambiaAttacco(new AttaccoGhiaccio());
    guerriero.attacca();

    // Combo divertente
    console.log("\n✨ Super Combo Time! ✨\n");
    mago.attacca();
    arciere.attacca();

    // Finale epico
    console.log("\n🎉 Grande vittoria! Tutti festeggiano! 🎉");
    guerriero.balletto();
    mago.balletto();
    arciere.balletto();
}

// Esegui l'avventura
avventuraDivertente();