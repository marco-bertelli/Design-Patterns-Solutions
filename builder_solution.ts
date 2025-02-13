type PizzaSize = 'small' | 'medium' | 'large';
type DoughType = 'normal' | 'wholegrain' | 'gluten-free';
type CookingType = 'normal' | 'well-done';

class Pizza {
    constructor(builder: PizzaBuilder) {
        this.size = builder.size;
        this.dough = builder.dough;
        this.ingredients = [...builder.ingredients];
        this.cooking = builder.cooking;
        this.extras = [...builder.extras];
        this.price = builder.calculatePrice();
    }

    private size: PizzaSize;
    private dough: DoughType;
    private ingredients: string[];
    private cooking: CookingType;
    private extras: string[];
    private price: number;

    describe(): void {
        console.log(`
            Pizza:
            Size: ${this.size}
            Dough: ${this.dough}
            Ingredients: ${this.ingredients.join(', ')}
            Cooking: ${this.cooking}
            Extras: ${this.extras.join(', ')}
            Price: €${this.price.toFixed(2)}
        `);
    }
}

class PizzaBuilder {
    size: PizzaSize = 'medium';
    dough: DoughType = 'normal';
    ingredients: string[] = [];
    cooking: CookingType = 'normal';
    extras: string[] = [];

    setSize(size: PizzaSize): PizzaBuilder {
        this.size = size;
        return this;
    }

    setDough(dough: DoughType): PizzaBuilder {
        this.dough = dough;
        return this;
    }

    addIngredient(ingredient: string): PizzaBuilder {
        this.ingredients.push(ingredient);
        return this;
    }

    removeIngredient(ingredient: string): PizzaBuilder {
        this.ingredients = this.ingredients.filter(i => i !== ingredient);
        return this;
    }

    setCooking(cooking: CookingType): PizzaBuilder {
        this.cooking = cooking;
        return this;
    }

    addExtra(extra: string): PizzaBuilder {
        this.extras.push(extra);
        return this;
    }

    calculatePrice(): number {
        let price = 0;

        // Base price by size
        switch (this.size) {
            case 'small': price += 6; break;
            case 'medium': price += 8; break;
            case 'large': price += 10; break;
        }

        // Dough price
        if (this.dough === 'gluten-free') price += 2;
        if (this.dough === 'wholegrain') price += 1;

        // Ingredients (after first two)
        if (this.ingredients.length > 2) {
            price += (this.ingredients.length - 2) * 0.5;
        }

        // Extras
        price += this.extras.length * 1.5;

        return price;
    }

    build(): Pizza {
        if (this.ingredients.length === 0) {
            throw new Error('Pizza must have at least one ingredient');
        }

        const hasBase = this.ingredients.some(i =>
            i === 'tomato sauce' || i === 'mozzarella');
        if (!hasBase) {
            throw new Error('Pizza must have either tomato sauce or mozzarella');
        }

        return new Pizza(this);
    }
}

class PizzaDirector {
    static createMargherita(builder: PizzaBuilder): Pizza {
        return builder
            .setSize('medium')
            .setDough('normal')
            .addIngredient('tomato sauce')
            .addIngredient('mozzarella')
            .addIngredient('basil')
            .setCooking('normal')
            .build();
    }

    static createQuattroFormaggi(builder: PizzaBuilder): Pizza {
        return builder
            .setSize('medium')
            .setDough('normal')
            .addIngredient('mozzarella')
            .addIngredient('gorgonzola')
            .addIngredient('parmesan')
            .addIngredient('fontina')
            .setCooking('normal')
            .build();
    }
}

// Test della soluzione
function testPizzaBuilder() {
    // Test pizza personalizzata
    const customPizza = new PizzaBuilder()
        .setSize('large')
        .setDough('gluten-free')
        .addIngredient('tomato sauce')
        .addIngredient('mozzarella')
        .addIngredient('mushrooms')
        .addIngredient('olives')
        .setCooking('well-done')
        .addExtra('double mozzarella')
        .build();

    console.log("Custom Pizza:");
    customPizza.describe();

    // Test Margherita using Director
    const margherita = PizzaDirector.createMargherita(new PizzaBuilder());
    console.log("\nMargherita:");
    margherita.describe();
}

testPizzaBuilder();