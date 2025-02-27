### Obiettivo
Implementare il pattern Observer in TypeScript creando un semplice sistema di notifiche.

### Descrizione
Devi implementare un sistema in cui un **Subject** mantiene una lista di **Observers** e li notifica ogni volta che il suo stato cambia.

1. **Crea un'interfaccia `Observer`** con un metodo `update(message: string): void`.
2. **Crea un'interfaccia `Subject`** con metodi per:
   - Aggiungere un observer
   - Rimuovere un observer
   - Notificare tutti gli observer
3. **Implementa una classe `NewsAgency`** che rappresenta il Subject. Deve contenere:
   - Una lista di observer
   - Un metodo per aggiornare le notizie e notificare gli observer
4. **Implementa una classe `NewsReader`** che rappresenta un Observer e stampa i messaggi ricevuti.
5. **Crea un esempio di utilizzo**, dove:
   - Una NewsAgency pubblica una notizia
   - Almeno due NewsReader ricevono e stampano la notizia

### Output Atteso
Quando viene pubblicata una nuova notizia, tutti gli observer registrati devono ricevere e stampare il messaggio.

Buon lavoro!