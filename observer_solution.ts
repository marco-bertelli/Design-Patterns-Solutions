// Implementazione dell'ObserverCustom Pattern in TypeScript

// Interfaccia ObserverCustom
interface ObserverCustom {
    update(message: string): void;
}

// Interfaccia Subscriber
interface Subscriber {
    addObserver(observerCustom: ObserverCustom): void;
    removeObserver(observerCustom: ObserverCustom): void;
    notifyObservers(message: string): void;
}

// Implementazione di NewsAgency (Subscriber)
class NewsAgency implements Subscriber {
    private observers: ObserverCustom[] = [];

    addObserver(observerCustom: ObserverCustom): void {
        this.observers.push(observerCustom);
    }

    removeObserver(observerCustom: ObserverCustom): void {
        this.observers = this.observers.filter(obs => obs !== observerCustom);
    }

    notifyObservers(message: string): void {
        this.observers.forEach(observerCustom => observerCustom.update(message));
    }

    publishNews(news: string): void {
        console.log(`News Published: ${news}`);
        this.notifyObservers(news);
    }
}

// Implementazione di NewsReader (ObserverCustom)
class NewsReader implements ObserverCustom {
    constructor(private name: string) { }

    update(message: string): void {
        console.log(`${this.name} received news: ${message}`);
    }
}

// Esempio di utilizzo
const agency = new NewsAgency();
const reader1 = new NewsReader("Alice");
const reader2 = new NewsReader("Bob");

agency.addObserver(reader1);
agency.addObserver(reader2);

agency.publishNews("TypeScript è fantastico!");
