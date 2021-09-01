import Playwidth from '../interfaces/Playwidth';

export default abstract class Drawable {
    context: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    xLimits: Playwidth;
    x: number;
    y: number;

    constructor(context: CanvasRenderingContext2D, xLimits: Playwidth) {
        this.context = context;
        this.xLimits = xLimits;
    }

    draw(): void {
        this.context.beginPath();
        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
        //image, sx , sy, sWidth, sHeight, dx, dy, dWidth, dHeight); (s refers to a cut, d to real position)
    }
}
