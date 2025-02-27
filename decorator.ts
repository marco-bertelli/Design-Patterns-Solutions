/**
 * Pattern Decorator in TypeScript
 * 
 * Il pattern Decorator permette di aggiungere funzionalità ad oggetti esistenti
 * ! in modo dinamico senza alterare la loro struttura.
 */

// Interfaccia Component: definisce l'interfaccia per gli oggetti che possono essere decorati
interface Coffee {
    getCost(): number;
    getDescription(): string;
}

// ConcreteComponent: implementazione base che può essere decorata
class SimpleCoffee implements Coffee {
    getCost(): number {
        return 10;
    }

    getDescription(): string {
        return "Caffè semplice";
    }
}

// Decorator base: mantiene un riferimento al componente e implementa la stessa interfaccia
abstract class CoffeeDecorator implements Coffee {
    protected decoratedCoffee: Coffee;

    constructor(coffee: Coffee) {
        this.decoratedCoffee = coffee;
    }

    getCost(): number {
        return this.decoratedCoffee.getCost();
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription();
    }
}

// ConcreteDecorator: estende il comportamento del componente in modo specifico
class MilkDecorator extends CoffeeDecorator {
    getCost(): number {
        return this.decoratedCoffee.getCost() + 2;
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", con latte";
    }
}

// ConcreteDecorator: un altro decoratore che aggiunge funzionalità
class SugarDecorator extends CoffeeDecorator {
    getCost(): number {
        return this.decoratedCoffee.getCost() + 1;
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", con zucchero";
    }
}

// ConcreteDecorator: ancora un altro decoratore
class WhippedCreamDecorator extends CoffeeDecorator {
    getCost(): number {
        return this.decoratedCoffee.getCost() + 3;
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", con panna montata";
    }
}

// Esempio di utilizzo del pattern
function clientCode() {
    // Creiamo un caffè semplice
    let coffee: Coffee = new SimpleCoffee();
    console.log(`${coffee.getDescription()} costa: €${coffee.getCost()}`);

    // Decoriamo il caffè con latte
    coffee = new MilkDecorator(coffee);
    console.log(`${coffee.getDescription()} costa: €${coffee.getCost()}`);

    // Decoriamo ulteriormente con zucchero
    coffee = new SugarDecorator(coffee);
    console.log(`${coffee.getDescription()} costa: €${coffee.getCost()}`);

    // Decoriamo ulteriormente con panna montata
    coffee = new WhippedCreamDecorator(coffee);
    console.log(`${coffee.getDescription()} costa: €${coffee.getCost()}`);

    // Possiamo anche creare combinazioni diverse direttamente
    let specialCoffee: Coffee = new WhippedCreamDecorator(
        new SugarDecorator(
            new MilkDecorator(
                new SimpleCoffee()
            )
        )
    );
    console.log(`Caffè speciale: ${specialCoffee.getDescription()}`);
    console.log(`Costo totale: €${specialCoffee.getCost()}`);
}

clientCode();