/**
 * Pattern Iterator in TypeScript
 * 
 * Il pattern Iterator fornisce un modo per accedere sequenzialmente agli elementi 
 * di una collezione senza esporre la sua struttura interna.
 */

// Interfaccia Iterator: definisce i metodi che tutti gli iteratori concreti devono implementare
interface Iterator<T> {
    // Verifica se ci sono altri elementi
    hasNext(): boolean;

    // Restituisce l'elemento corrente e passa al successivo
    next(): T;

    // Elemento corrente senza avanzare (opzionale)
    current?(): T;

    // Reimposta l'iteratore (opzionale)
    reset?(): void;
}

// Interfaccia IterableCollection: definisce i metodi che tutte le collezioni devono implementare
interface IterableCollection<T> {
    // Crea un nuovo iteratore per la collezione
    createIterator(): Iterator<T>;
}

// ConcreteIterator: implementa l'interfaccia Iterator per uno specifico tipo di collezione
class ArrayIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number = 0;

    constructor(collection: T[]) {
        this.collection = collection;
    }

    hasNext(): boolean {
        return this.position < this.collection.length;
    }

    next(): T {
        const item = this.collection[this.position];
        this.position++;
        return item;
    }

    current(): T {
        return this.collection[this.position];
    }

    reset(): void {
        this.position = 0;
    }
}

// ConcreteCollection: implementa l'interfaccia IterableCollection
class BookCollection implements IterableCollection<Book> {
    private books: Book[] = [];

    constructor(books: Book[] = []) {
        this.books = books;
    }

    // Aggiunge un libro alla collezione
    addBook(book: Book): void {
        this.books.push(book);
    }

    // Rimuove un libro dalla collezione
    removeBook(isbn: string): void {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    // Crea un iteratore per la collezione
    createIterator(): Iterator<Book> {
        return new ArrayIterator<Book>(this.books);
    }

    // Crea un iteratore che restituisce solo libri di un certo genere
    createGenreIterator(genre: string): Iterator<Book> {
        const genreBooks = this.books.filter(book => book.genre === genre);
        return new ArrayIterator<Book>(genreBooks);
    }

    // Crea un iteratore che restituisce libri in ordine alfabetico per titolo
    createAlphabeticalIterator(): Iterator<Book> {
        const sortedBooks = [...this.books].sort((a, b) => a.title.localeCompare(b.title));
        return new ArrayIterator<Book>(sortedBooks);
    }
}

// Classe Book per rappresentare un libro nella collezione
class Book {
    constructor(
        public title: string,
        public author: string,
        public isbn: string,
        public genre: string,
        public year: number
    ) { }

    toString(): string {
        return `${this.title} (${this.year}) di ${this.author} [${this.genre}]`;
    }
}

// TreeIterator: un altro esempio di iteratore per una struttura ad albero
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

// Iteratore per attraversare un albero binario in ordine (inorder traversal)
class InOrderTreeIterator<T> implements Iterator<T> {
    private root: TreeNode<T> | null;
    private stack: TreeNode<T>[] = [];
    private current: TreeNode<T> | null = null;

    constructor(root: TreeNode<T> | null) {
        this.root = root;
        this.reset();
    }

    hasNext(): boolean {
        return this.stack.length > 0 || this.current !== null;
    }

    next(): T {
        // Attraversa tutti i nodi più a sinistra
        while (this.current) {
            this.stack.push(this.current);
            this.current = this.current.left;
        }

        // Ottieni il prossimo nodo
        if (this.stack.length === 0) {
            throw new Error("No more elements");
        }

        const node = this.stack.pop()!;
        const result = node.value;

        // Passa al sottoalbero destro
        this.current = node.right;

        return result;
    }

    reset(): void {
        this.stack = [];
        this.current = this.root;
    }
}

// Codice client che dimostra l'uso del pattern Iterator
function clientCode() {
    // Creazione di una collezione di libri
    const books = new BookCollection([
        new Book("Il Signore degli Anelli", "J.R.R. Tolkien", "978-0618640157", "Fantasy", 1954),
        new Book("1984", "George Orwell", "978-0451524935", "Distopia", 1949),
        new Book("Il Piccolo Principe", "Antoine de Saint-Exupéry", "978-0156012195", "Favola", 1943),
        new Book("Guerra e Pace", "Lev Tolstoj", "978-1400079988", "Storico", 1869),
        new Book("Harry Potter e la Pietra Filosofale", "J.K. Rowling", "978-0590353427", "Fantasy", 1997),
        new Book("Orgoglio e Pregiudizio", "Jane Austen", "978-0141439518", "Romanzo", 1813),
        new Book("Lo Hobbit", "J.R.R. Tolkien", "978-0618260300", "Fantasy", 1937)
    ]);

    // Utilizzo dell'iteratore standard
    console.log("=== Tutti i libri ===");
    const iterator = books.createIterator();
    while (iterator.hasNext()) {
        console.log(iterator.next().toString());
    }

    // Utilizzo dell'iteratore per genere
    console.log("\n=== Libri Fantasy ===");
    const fantasyIterator = books.createGenreIterator("Fantasy");
    while (fantasyIterator.hasNext()) {
        console.log(fantasyIterator.next().toString());
    }

    // Utilizzo dell'iteratore alfabetico
    console.log("\n=== Libri in ordine alfabetico ===");
    const alphabeticalIterator = books.createAlphabeticalIterator();
    while (alphabeticalIterator.hasNext()) {
        console.log(alphabeticalIterator.next().toString());
    }

    // Esempio con un iteratore di albero binario
    console.log("\n=== Traversing a Binary Tree ===");

    // Costruzione di un albero binario di esempio
    const root = new TreeNode<number>(8);
    root.left = new TreeNode<number>(3);
    root.right = new TreeNode<number>(10);
    root.left.left = new TreeNode<number>(1);
    root.left.right = new TreeNode<number>(6);
    root.right.right = new TreeNode<number>(14);
    root.left.right.left = new TreeNode<number>(4);
    root.left.right.right = new TreeNode<number>(7);

    // Utilizzo dell'iteratore dell'albero
    const treeIterator = new InOrderTreeIterator<number>(root);
    console.log("In-order traversal:");
    while (treeIterator.hasNext()) {
        console.log(treeIterator.next());
    }
}

clientCode();