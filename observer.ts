/**
 * Pattern Observer in TypeScript
 * 
 * Il pattern Observer definisce una dipendenza uno-a-molti tra oggetti, in modo che
 * quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.
 */

// Interfaccia Observer: definisce il metodo di aggiornamento che gli observer concreti devono implementare
interface Observer {
    // Metodo chiamato quando il soggetto osservato cambia stato
    update(subject: Subject): void;
}

// Interfaccia Subject: definisce i metodi per gestire gli observer
interface Subject {
    // Aggiunge un observer alla lista
    attach(observer: Observer): void;

    // Rimuove un observer dalla lista
    detach(observer: Observer): void;

    // Notifica tutti gli observer registrati
    notify(): void;
}

// ConcreteSubject: implementa l'interfaccia Subject e mantiene lo stato che interessa agli observer
class WeatherStation implements Subject {
    private observers: Observer[] = [];

    private temperature: number;
    private humidity: number;
    private pressure: number;

    constructor(temperature: number, humidity: number, pressure: number) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
    }

    // Metodi per aggiungere e rimuovere observer
    attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            console.log('Subject: Observer già registrato.');
            return;
        }

        console.log('Subject: Aggiunto un nuovo observer.');
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            console.log('Subject: Observer non trovato.');
            return;
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Rimosso un observer.');
    }

    // Notifica tutti gli observer
    notify(): void {
        console.log('Subject: Notifica a tutti gli observer...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // Metodi specifici del ConcreteSubject
    setMeasurements(temperature: number, humidity: number, pressure: number): void {
        console.log('\nWeatherStation: Nuove misurazioni ricevute');
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;

        // Quando lo stato cambia, notifica tutti gli observer
        this.notify();
    }

    // Getter per accedere allo stato
    getTemperature(): number {
        return this.temperature;
    }

    getHumidity(): number {
        return this.humidity;
    }

    getPressure(): number {
        return this.pressure;
    }
}

// ConcreteObserver: implementa l'interfaccia Observer
class TemperatureDisplay implements Observer {
    private subject: Subject;
    private name: string;

    constructor(name: string, subject: Subject) {
        this.name = name;
        this.subject = subject;

        // Si auto-registra al soggetto
        this.subject.attach(this);
    }

    update(subject: Subject): void {
        if (subject instanceof WeatherStation) {
            console.log(`${this.name}: Temperatura aggiornata a ${subject.getTemperature()}°C`);
        }
    }
}

// Un altro ConcreteObserver
class WeatherApp implements Observer {
    private subject: Subject;
    private name: string;

    constructor(name: string, subject: Subject) {
        this.name = name;
        this.subject = subject;

        // Si auto-registra al soggetto
        this.subject.attach(this);
    }

    update(subject: Subject): void {
        if (subject instanceof WeatherStation) {
            console.log(
                `${this.name}: Condizioni meteo aggiornate - ` +
                `Temperatura: ${subject.getTemperature()}°C, ` +
                `Umidità: ${subject.getHumidity()}%, ` +
                `Pressione: ${subject.getPressure()} hPa`
            );

            // Calcola l'indice di calore (esempio di elaborazione dati)
            this.calculateHeatIndex(subject);
        }
    }

    calculateHeatIndex(station: WeatherStation): void {
        // Formula semplificata per l'indice di calore
        const t = station.getTemperature();
        const rh = station.getHumidity();

        const heatIndex = (
            -8.78469475556 +
            1.61139411 * t +
            2.33854883889 * rh +
            -0.14611605 * t * rh +
            -0.012308094 * Math.pow(t, 2) +
            -0.0164248277778 * Math.pow(rh, 2) +
            0.002211732 * Math.pow(t, 2) * rh +
            0.00072546 * t * Math.pow(rh, 2) +
            -0.000003582 * Math.pow(t, 2) * Math.pow(rh, 2)
        );

        console.log(`${this.name}: Indice di calore calcolato: ${heatIndex.toFixed(1)}°C`);
    }
}

// Terzo ConcreteObserver
class WeatherLogger implements Observer {
    private subject: Subject;
    private name: string;
    private log: Array<{
        timestamp: Date;
        temperature: number;
        humidity: number;
        pressure: number;
    }> = [];

    constructor(name: string, subject: Subject) {
        this.name = name;
        this.subject = subject;

        // Si auto-registra al soggetto
        this.subject.attach(this);
    }

    update(subject: Subject): void {
        if (subject instanceof WeatherStation) {
            const entry = {
                timestamp: new Date(),
                temperature: subject.getTemperature(),
                humidity: subject.getHumidity(),
                pressure: subject.getPressure()
            };

            this.log.push(entry);
            console.log(`${this.name}: Aggiunto nuovo log dati meteo (${this.log.length} record totali)`);
        }
    }

    // Metodo per visualizzare lo storico
    printLog(): void {
        console.log(`\n${this.name}: Storico dati meteo:`);
        this.log.forEach((entry, index) => {
            console.log(`  ${index + 1}. [${entry.timestamp.toLocaleString()}] ` +
                `T: ${entry.temperature}°C, ` +
                `H: ${entry.humidity}%, ` +
                `P: ${entry.pressure} hPa`);
        });
    }
}

// Codice client che dimostra l'utilizzo del pattern Observer
function clientCode() {
    // Creazione del soggetto (Subject)
    const weatherStation = new WeatherStation(25.2, 65.3, 1013.25);

    // Creazione degli osservatori (Observer)
    const tempDisplay = new TemperatureDisplay("Display Temperatura", weatherStation);
    const weatherApp = new WeatherApp("App Meteo", weatherStation);
    const weatherLogger = new WeatherLogger("Sistema di Logging", weatherStation);

    // Cambiamento di stato e notifica automatica
    weatherStation.setMeasurements(28.6, 70.4, 1012.8);

    // Rimozione di un observer
    console.log('\nRimozione del display temperatura...');
    weatherStation.detach(tempDisplay);

    // Altro cambiamento di stato
    weatherStation.setMeasurements(27.3, 68.9, 1014.1);

    // Visualizziamo lo storico dei dati
    weatherLogger.printLog();
}

clientCode();