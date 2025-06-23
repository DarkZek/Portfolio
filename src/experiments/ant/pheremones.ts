import 'q5';

export enum PheromoneType {
    FOOD = 0,
    HOME = 1
}

export type PheremoneData = {
    angle: number;
    strength: number;
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
                this.setData(x, y, [0, 0]); // Clear the pheromone image
            }
        }

        this.image.updatePixels();
    }

    private getData(x: number, y: number): [number, number] {
        const imageData = this.image.get(x, y)
        return [imageData[0], imageData[1]];
    }

    private setData(x: number, y: number, data: [number, number]) {
        this.image.set(x, y, color(data[0], data[1], 0, 255));
    }

    addPheromone(x: number, y: number, angle: number) {
        const [red, green] = this.getData(x * this.scale, y * this.scale);

        let strength = red / 255; // Normalize the strength to a value between 0 and 1

        const existingAngle = (green / 255) * TWO_PI; // Normalize the angle to a value between 0 and TWO_PI
        let newAngle = lerp(existingAngle, angle % TWO_PI, 0.22);

        if (strength === 0) {
            newAngle = angle
        }

        strength += 0.1; // Increase the strength by 0.1

        this.setData(x * this.scale, y * this.scale, [strength * 255, newAngle / TWO_PI * 255]); // Update the pheromone image
    }

    getPheromone(x: number, y: number): PheremoneData {
        const [red, green] = this.getData(x * this.scale, y * this.scale);

        const strength = red / 255; // Normalize the strength to a value between 0 and 1
        const angle = green / 255 * TWO_PI; // Normalize the angle to a value between 0 and TWO_PI
 
        return {
            angle: angle,
            strength: strength
        }
    }

    fadePheremones() {
        this.image.loadPixels();

        for (let x = 0; x < this.image.width; x += 1) {
            for (let y = 0; y < this.image.height; y += 1) {
                const [red, green] = this.getData(x, y);
                
                this.setData(x, y, [red - 0.6, green]); // Update the pheromone image
            }
        }

        this.image.updatePixels()
    }

    // Spread pheromones by applying a blur filter
    spreadPheremones() {
        this.image.filter(BLUR, 0.2)
    }
}
