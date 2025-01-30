interface Button {
    render(): string;
}

interface Input {
    render(): string;
}

// Concrete Products - Light Theme
class LightButton implements Button {
    render(): string {
        return "Rendering light button with white background";
    }
}

class LightInput implements Input {
    render(): string {
        return "Rendering light input with white background";
    }
}

// Concrete Products - Dark Theme
class DarkButton implements Button {
    render(): string {
        return "Rendering dark button with black background";
    }
}

class DarkInput implements Input {
    render(): string {
        return "Rendering dark input with black background";
    }
}

// ! Abstract Factory
interface UIFactory {
    createButton(): Button;
    createInput(): Input;
}

// Concrete Factories
class LightThemeFactory implements UIFactory {
    createButton(): Button {
        return new LightButton();
    }

    createInput(): Input {
        return new LightInput();
    }
}

class DarkThemeFactory implements UIFactory {
    createButton(): Button {
        return new DarkButton();
    }

    createInput(): Input {
        return new DarkInput();
    }
}

// ! Client code
function createUI(factory: UIFactory) {
    const button = factory.createButton();
    const input = factory.createInput();

    console.log(button.render());
    console.log(input.render());
}

// Usage
const lightFactory = new LightThemeFactory();
const darkFactory = new DarkThemeFactory();

console.log("Light theme:");
createUI(lightFactory);

console.log("\nDark theme:");
createUI(darkFactory);