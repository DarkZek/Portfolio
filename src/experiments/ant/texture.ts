import { CanvasSource, Color, Texture } from "pixi.js";

export function generateAntTexture(color: Color): Texture {
    const antTextureSource = new CanvasSource({
        height: 2,
        width: 2,
        format: 'rgba8unorm',
        scaleMode: 'nearest',
        wrapMode: 'repeat'
    })
    
    antTextureSource.context2D.fillStyle = `rgba(${color.red * 255}, ${color.green * 255}, ${color.blue * 255}, ${color.alpha})`;
    antTextureSource.context2D.fillRect(0, 0, 1, 2);

    return new Texture({ source: antTextureSource })
}