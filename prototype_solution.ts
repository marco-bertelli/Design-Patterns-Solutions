/**
 * SOLUZIONE ESERCIZIO: Sistema di Clonazione Personaggi
 */

// 1. Interfaccia Prototype
interface CharacterPrototype {
    clone(): CharacterPrototype;
    getStats(): string;
}

// 2. Implementazione della classe personaggio
class GameCharacter implements CharacterPrototype {
    private name: string;
    private characterClass: 'warrior' | 'mage' | 'archer';
    private stats: {
        strength: number;
        intelligence: number;
        dexterity: number;
        health: number;
    };
    private skills: string[];

    constructor(
        name: string,
        characterClass: 'warrior' | 'mage' | 'archer',
        stats: {
            strength: number;
            intelligence: number;
            dexterity: number;
            health: number
        },
        skills: string[] = []
    ) {
        this.name = name;
        this.characterClass = characterClass;
        this.stats = stats;
        this.skills = skills;
    }

    // Implementazione del metodo clone
    public clone(): GameCharacter {
        // Copia profonda delle statistiche
        const statsClone = { ...this.stats };
        // Copia dell'array delle abilità
        const skillsClone = [...this.skills];

        // Restituzione di un nuovo oggetto con i valori clonati
        return new GameCharacter(
            `${this.name}_clone`,
            this.characterClass,
            statsClone,
            skillsClone
        );
    }

    // Metodo per visualizzare le statistiche
    public getStats(): string {
        return `
            Character: ${this.name}
            Class: ${this.characterClass}
            Stats:
                Strength: ${this.stats.strength}
                Intelligence: ${this.stats.intelligence}
                Dexterity: ${this.stats.dexterity}
                Health: ${this.stats.health}
            Skills: ${this.skills.join(', ')}
        `;
    }

    // Metodi per modificare il personaggio
    public setName(name: string): void {
        this.name = name;
    }

    public addSkill(skill: string): void {
        this.skills.push(skill);
    }
}

// Test della soluzione
function testSolution() {
    // Creazione template
    const warriorTemplate = new GameCharacter(
        "WarriorTemplate",
        "warrior",
        {
            strength: 15,
            intelligence: 8,
            dexterity: 10,
            health: 100
        },
        ["Basic Attack", "Defense Stance"]
    );

    // Clonazione e modifica
    const newWarrior = warriorTemplate.clone();
    newWarrior.setName("Bob the Warrior");
    newWarrior.addSkill("Power Strike");

    // Verifica dell'indipendenza
    console.log("Template Character:");
    console.log(warriorTemplate.getStats());
    console.log("\nCloned Character:");
    console.log(newWarrior.getStats());
}

// Esegui il test
testSolution();