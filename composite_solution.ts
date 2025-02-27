// Interfaccia Component per tutte le figure
interface Shape {
    getArea(): number;
    getName(): string;
    add?(shape: Shape): void;
    remove?(shape: Shape): void;
    getChild?(index: number): Shape | null;
}

// Implementazione di figure singole (Leaf)
class Circle implements Shape {
    constructor(private radius: number, private name: string) { }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getName(): string {
        return this.name;
    }
}

class Rectangle implements Shape {
    constructor(
        private width: number,
        private height: number,
        private name: string
    ) { }

    getArea(): number {
        return this.width * this.height;
    }

    getName(): string {
        return this.name;
    }
}

class Triangle implements Shape {
    constructor(
        private base: number,
        private height: number,
        private name: string
    ) { }

    getArea(): number {
        return (this.base * this.height) / 2;
    }

    getName(): string {
        return this.name;
    }
}

// Implementazione del Composite
class ShapeGroup implements Shape {
    private shapes: Shape[] = [];

    constructor(private name: string) { }

    getArea(): number {
        return this.shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
    }

    getName(): string {
        return this.name;
    }

    add(shape: Shape): void {
        this.shapes.push(shape);
    }

    remove(shape: Shape): void {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    getChild(index: number): Shape | null {
        return this.shapes[index] || null;
    }
}

// Esempio di utilizzo
function testShapes(): void {
    // Creiamo figure singole
    const circle = new Circle(5, "Cerchio");
    const rectangle = new Rectangle(4, 6, "Rettangolo");
    const triangle = new Triangle(3, 4, "Triangolo");

    // Creiamo un gruppo e aggiungiamo le figure
    const group1 = new ShapeGroup("Gruppo 1");
    group1.add(circle);
    group1.add(rectangle);

    // Creiamo un secondo gruppo
    const group2 = new ShapeGroup("Gruppo 2");
    group2.add(triangle);

    // Creiamo un gruppo principale che contiene gli altri gruppi
    const mainGroup = new ShapeGroup("Gruppo Principale");
    mainGroup.add(group1);
    mainGroup.add(group2);

    // Calcoliamo e stampiamo le aree
    console.log(`Area del ${circle.getName()}: ${circle.getArea().toFixed(2)}`);
    console.log(`Area del ${rectangle.getName()}: ${rectangle.getArea().toFixed(2)}`);
    console.log(`Area del ${group1.getName()}: ${group1.getArea().toFixed(2)}`);
    console.log(`Area del ${mainGroup.getName()}: ${mainGroup.getArea().toFixed(2)}`);
}

testShapes();