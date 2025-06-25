import { CanvasSource, Color, Texture } from 'pixi.js';
import { lerp, TWO_PI } from './utils';

export class FoodMap {

    public imageData: ImageData
    public imageSource: CanvasSource
    public image: Texture

    constructor(height: number, width: number) {

        this.imageSource = new CanvasSource({
            height,
            width,
            format: 'rgba8unorm',
            scaleMode: 'linear'
        })
        this.image = new Texture({ source: this.imageSource })

        this.imageData = new ImageData(width, height)
    }

    get(x: number, y: number): [number, number, number, number] {
        const offset = (Math.floor(x) + Math.floor(y) * this.image.width) * 4

        return [
            this.imageData.data[offset],
            this.imageData.data[offset + 1],
            this.imageData.data[offset + 2],
            this.imageData.data[offset + 3]
        ]
    }

    set(x: number, y: number, data: [number, number, number, number]) {
        const offset = (Math.floor(x) + Math.floor(y) * this.image.width) * 4
        this.imageData.data[offset] = data[0]
        this.imageData.data[offset + 1] = data[1]
        this.imageData.data[offset + 2] = data[2]
        this.imageData.data[offset + 3] = data[3]
    }

    // Push the latest data to the GPU
    pullImage() {
        this.imageData = this.imageSource.context2D.getImageData(0, 0, this.image.width, this.image.height);
    }

    // Push the latest data to the GPU
    pushImage() {
        this.imageSource.context2D.putImageData(this.imageData, 0, 0);
        this.imageSource.update();
    }
}
