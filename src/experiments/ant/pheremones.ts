import { lerp, TWO_PI } from './utils';

export enum PheromoneType {
    FOOD = 0,
    HOME = 1
}

export type PheremoneData = {
    angle: number;
    strength: number;
}

export class Pheremone {

    public imageData: ImageData
    public height: number
    public width: number
    public scale: number

    constructor(height: number, width: number, scale: number = 0.1) {
        this.scale = scale
        this.height = height
        this.width = width
        this.imageData = new ImageData(width, height)
        this.clear()
    }

    clear() {
        // Set to default
        for (let x = 0; x < this.width; x += 1) {
            for (let y = 0; y < this.height; y += 1) {
                this.setData(x, y, [0, 0]); // Clear the pheromone image
            }
        }
    }

    private getData(x: number, y: number): [number, number] {
        const offset = (Math.floor(x) + Math.floor(y) * this.width) * 2; // Each pixel has 2 channels (red and green)
        const red = this.imageData.data[offset];
        const green = this.imageData.data[offset + 1];
        return [red, green];
    }

    private setData(x: number, y: number, data: [number, number]) {
        const offset = (Math.floor(x) + Math.floor(y) * this.width) * 2; // Each pixel has 2 channels (red and green)
        this.imageData.data[offset] = data[0]
        this.imageData.data[offset + 1] = data[1]
    }

    // Push the latest data to the GPU
    // updateImage() {
    //     this.imageSource.context2D.putImageData(this.imageData, 0, 0);
    //     this.image.update();
    // }

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
        for (let x = 0; x < this.width; x += 1) {
            for (let y = 0; y < this.height; y += 1) {
                const [red, green] = this.getData(x, y);
                
                this.setData(x, y, [red - 0.6, green]); // Update the pheromone image
            }
        }
    }
}
