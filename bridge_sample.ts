// Implementazione (Interface)
interface DeviceImplementation {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Implementazioni Concrete
class TV implements DeviceImplementation {
    private on: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.on;
    }

    enable(): void {
        this.on = true;
        console.log('TV turned on');
    }

    disable(): void {
        this.on = false;
        console.log('TV turned off');
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
        console.log(`TV volume set to ${this.volume}`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`TV channel set to ${this.channel}`);
    }
}

class Radio implements DeviceImplementation {
    private on: boolean = false;
    private volume: number = 20;
    private channel: number = 88.0;

    isEnabled(): boolean {
        return this.on;
    }

    enable(): void {
        this.on = true;
        console.log('Radio turned on');
    }

    disable(): void {
        this.on = false;
        console.log('Radio turned off');
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
        console.log(`Radio volume set to ${this.volume}`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`Radio frequency set to ${this.channel.toFixed(1)} MHz`);
    }
}

// Astrazione
abstract class RemoteControl {
    protected device: DeviceImplementation;

    constructor(device: DeviceImplementation) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Astrazione Raffinata
class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        this.device.setVolume(0);
    }

    // Funzione di memoria canale
    private memoryChannels: number[] = [];

    saveChannel(): void {
        this.memoryChannels.push(this.device.getChannel());
        console.log(`Channel ${this.device.getChannel()} saved to memory`);
    }

    // Funzione di random channel
    goToRandomChannel(): void {
        const randomChannel = Math.floor(Math.random() * 100) + 1;
        this.device.setChannel(randomChannel);
    }
}

// Esempio di utilizzo
function testDevices(): void {
    // Test con TV
    const tv = new TV();
    const tvRemote = new AdvancedRemoteControl(tv);

    console.log('Testing TV with Advanced Remote:');
    tvRemote.togglePower();
    tvRemote.channelUp();
    tvRemote.volumeUp();
    tvRemote.saveChannel();
    tvRemote.goToRandomChannel();
    tvRemote.mute();
    tvRemote.togglePower();

    console.log('\n------------------------\n');

    // Test con Radio
    const radio = new Radio();
    const radioRemote = new AdvancedRemoteControl(radio);

    console.log('Testing Radio with Advanced Remote:');
    radioRemote.togglePower();
    radioRemote.channelUp();
    radioRemote.volumeUp();
    radioRemote.saveChannel();
    radioRemote.mute();
    radioRemote.togglePower();
}

// Esegui il test
testDevices();