interface Car {
    getDescription(): string;
    getPrice(): number;
    getMaintenanceCost(): number;
}

interface Motorcycle {
    getDescription(): string;
    getPrice(): number;
    getMaintenanceCost(): number;
}

class EconomyCar implements Car {
    getDescription(): string {
        return "Economy Car: Basic model with essential features";
    }

    getPrice(): number {
        return 20000;
    }

    getMaintenanceCost(): number {
        return 1000;
    }
}

class LuxuryCar implements Car {
    getDescription(): string {
        return "Luxury Car: Premium model with all features";
    }

    getPrice(): number {
        return 50000;
    }

    getMaintenanceCost(): number {
        return 3000;
    }
}

class EconomyMotorcycle implements Motorcycle {
    getDescription(): string {
        return "Economy Motorcycle: Basic model for daily commute";
    }

    getPrice(): number {
        return 5000;
    }

    getMaintenanceCost(): number {
        return 500;
    }
}

class LuxuryMotorcycle implements Motorcycle {
    getDescription(): string {
        return "Luxury Motorcycle: High-performance sport bike";
    }

    getPrice(): number {
        return 15000;
    }

    getMaintenanceCost(): number {
        return 1500;
    }
}

interface VehicleFactory {
    createCar(): Car;
    createMotorcycle(): Motorcycle;
}

class EconomyVehicleFactory implements VehicleFactory {
    createCar(): Car {
        return new EconomyCar();
    }

    createMotorcycle(): Motorcycle {
        return new EconomyMotorcycle();
    }
}

class LuxuryVehicleFactory implements VehicleFactory {
    createCar(): Car {
        return new LuxuryCar();
    }

    createMotorcycle(): Motorcycle {
        return new LuxuryMotorcycle();
    }
}

// Test
function testVehicleFactory(factory: VehicleFactory) {
    const car = factory.createCar();
    const motorcycle = factory.createMotorcycle();

    console.log("\nCar:");
    console.log(car.getDescription());
    console.log(`Price: €${car.getPrice()}`);
    console.log(`Annual Maintenance: €${car.getMaintenanceCost()}`);

    console.log("\nMotorcycle:");
    console.log(motorcycle.getDescription());
    console.log(`Price: €${motorcycle.getPrice()}`);
    console.log(`Annual Maintenance: €${motorcycle.getMaintenanceCost()}`);
}

// Test della soluzione
const economyFactory = new EconomyVehicleFactory();
const luxuryFactory = new LuxuryVehicleFactory();

console.log("=== Economy Vehicles ===");
testVehicleFactory(economyFactory);

console.log("\n=== Luxury Vehicles ===");
testVehicleFactory(luxuryFactory);