/**
 * Pattern Facade in TypeScript
 * 
 * Il pattern Facade fornisce un'interfaccia semplificata a un insieme complesso 
 * di classi, una libreria, o un framework, nascondendo la complessità sottostante.
 */

// Sottosistema complesso: classi che costituiscono il sistema video
class VideoFile {
    private file: string;

    constructor(filename: string) {
        this.file = filename;
    }

    getFilename(): string {
        return this.file;
    }
}

class VideoCodec {
    private type: string;

    constructor(type: string) {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}

class OggCompressionCodec extends VideoCodec {
    constructor() {
        super("ogg");
    }

    compress(file: VideoFile): void {
        console.log(`Comprimendo il video ${file.getFilename()} in formato OGG...`);
    }
}

class MPEG4CompressionCodec extends VideoCodec {
    constructor() {
        super("mp4");
    }

    compress(file: VideoFile): void {
        console.log(`Comprimendo il video ${file.getFilename()} in formato MPEG-4...`);
    }
}

class CodecFactory {
    extract(file: VideoFile): VideoCodec {
        const filename = file.getFilename();
        if (filename.endsWith(".mp4")) {
            console.log("Estratto codec MP4");
            return new MPEG4CompressionCodec();
        } else if (filename.endsWith(".ogg")) {
            console.log("Estratto codec OGG");
            return new OggCompressionCodec();
        } else {
            console.log("Codec non supportato, usando MP4 di default");
            return new MPEG4CompressionCodec();
        }
    }
}

class BitrateReader {
    static read(file: VideoFile, codec: VideoCodec): Buffer {
        console.log(`Lettura del file ${file.getFilename()} con codec ${codec.getType()}`);
        return Buffer.from(`Dati del file ${file.getFilename()}`);
    }

    static convert(buffer: Buffer, codec: VideoCodec): Buffer {
        console.log(`Conversione dei dati con codec ${codec.getType()}`);
        return Buffer.from(`Dati convertiti in ${codec.getType()}`);
    }
}

class AudioMixer {
    fix(videoFile: VideoFile): Buffer {
        console.log(`Miglioramento dell'audio per ${videoFile.getFilename()}`);
        return Buffer.from("Audio migliorato");
    }
}

// La classe Facade che semplifica l'accesso al sottosistema complesso
class VideoConversionFacade {
    convertVideo(filename: string, format: string): string {
        console.log("=== Inizio conversione video ===");

        const file = new VideoFile(filename);
        const sourceCodec = new CodecFactory().extract(file);

        let destinationCodec: VideoCodec;
        if (format === "mp4") {
            destinationCodec = new MPEG4CompressionCodec();
        } else if (format === "ogg") {
            destinationCodec = new OggCompressionCodec();
        } else {
            throw new Error(`Formato non supportato: ${format}`);
        }

        const buffer = BitrateReader.read(file, sourceCodec);
        const convertedBuffer = BitrateReader.convert(buffer, destinationCodec);

        const result = (new AudioMixer()).fix(file);

        const outputFilename = filename.substring(0, filename.lastIndexOf(".")) + "." + format;
        console.log(`Video convertito: ${outputFilename}`);
        console.log("=== Fine conversione video ===");

        return outputFilename;
    }
}

// Codice client che utilizza la Facade
function clientCode() {
    const converter = new VideoConversionFacade();

    // Il client utilizza solo la semplice interfaccia della Facade
    // senza preoccuparsi della complessità sottostante
    const mp4Result = converter.convertVideo("miovideo.ogg", "mp4");
    console.log(`\nFile risultante: ${mp4Result}`);

    console.log("\n-------------------------\n");

    const oggResult = converter.convertVideo("altrovideo.mp4", "ogg");
    console.log(`\nFile risultante: ${oggResult}`);
}

clientCode();