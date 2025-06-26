import { CanvasSource, Color, Texture } from 'pixi.js';
import { lerp, TWO_PI } from './utils';

export class FoodMap {

    public imageData: ImageData
    public imageSource: CanvasSource
    public image: Texture
    public scale: number = 1;

    constructor(height: number, width: number, scale: number) {

        this.imageSource = new CanvasSource({
            height,
            width,
            format: 'rgba8unorm',
            scaleMode: 'linear'
        })
        this.image = new Texture({ source: this.imageSource })
        this.scale = scale
        this.imageData = new ImageData(width, height)
    }

    setup(foodColor: Color) {
        const ctx = this.imageSource.context2D;

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `bold ${(this.imageData.width)/6}px Arial`;
        ctx.fillStyle = `rgb(${foodColor.red*255}, ${foodColor.green*255}, ${foodColor.blue*255})`;
        ctx.fillText("Marshall", (this.imageData.width)/2, (this.imageData.height)/2);
    }

    get(x: number, y: number): [number, number, number, number] {
        const offset = (Math.floor(x*this.scale) + Math.floor(y*this.scale) * this.image.width) * 4

        return [
            this.imageData.data[offset],
            this.imageData.data[offset + 1],
            this.imageData.data[offset + 2],
            this.imageData.data[offset + 3]
        ]
    }

    set(x: number, y: number, data: [number, number, number, number]) {
        const offset = (Math.floor(x*this.scale) + Math.floor(y*this.scale) * this.image.width) * 4
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
