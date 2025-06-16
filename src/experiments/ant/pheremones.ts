import 'q5';

export enum PheromoneType {
    FOOD = 0,
    HOME = 1
}

export type PheremoneData = {
    [PheromoneType.HOME]: {
        angle: number;
        strength: number;
    },
    // [PheromoneType.FOOD]: {
    //     angle: number;
    //     strength: number;
    // }
}

export class Pheremone {
    public image: Q5.Image;
    public scale: number

    constructor(image: Q5.Image, scale: number = 0.1) {
        this.image = image;
        this.scale = scale
        this.clear()
    }

    clear() {
        // Set to default
        this.image.loadPixels()

        for (let x = 0; x < this.image.width; x += 1) {
            for (let y = 0; y < this.image.height; y += 1) {
                this.image.set(x, y, color(0, 0, 0, 255)); // Clear the pheromone image
            }
        }

        this.image.updatePixels();
    }

    addPheromone(x: number, y: number, angle: number, type: PheromoneType) {
        const imageData = this.image.get(x * this.scale, y * this.scale)

        const [red, green] = imageData

        let strength = red / 255; // Normalize the strength to a value between 0 and 1
        strength += 0.1; // Increase the strength by 0.1

        const existingAngle = green / 255 * TWO_PI; // Normalize the angle to a value between 0 and TWO_PI
        const newAngle = lerp(existingAngle, angle, 0.5);

        const newColor = color(strength * 255, newAngle / TWO_PI * 255, 0, 255)

        this.image.set(x * this.scale, y * this.scale, newColor); // Update the pheromone image
    }

    getPheromone(x: number, y: number): PheremoneData {
        const imageData = this.image.get(x * this.scale, y * this.scale)

        const [red, green] = imageData

        const strength = red / 255; // Normalize the strength to a value between 0 and 1
        const angle = green / 255 * TWO_PI; // Normalize the angle to a value between 0 and TWO_PI
 
        return {
            [PheromoneType.HOME]: {
                angle: angle,
                strength: strength
            }
        }
    }

    fadePheremones() {

        this.image.loadPixels();

        for (let x = 0; x < this.image.width; x += 1) {
            for (let y = 0; y < this.image.height; y += 1) {
                const imageData = this.image.get(x, y)
                const [red, green] = imageData
                
                const newColor = color(red - 1, green, 0, 255)
                this.image.set(x, y, newColor); // Update the pheromone image
            }
        }

        this.image.updatePixels()
    }
}
