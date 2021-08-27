export default class Drawable {
    context: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    height: number;
    width: number;
    private _x: number;
    private _y: number;

    constructor(context: CanvasRenderingContext2D, sprite: HTMLImageElement, width: number, height: number) {
        this.context = context;
        this.sprite = sprite;
        this.height = height;
        this.width = width;
        this._x = 50;
        this._y = 50;
    }

    draw(): void {
        this.context.beginPath();
        this.context.drawImage(this.sprite, this._x, this._y, this.width, this.height);
        //image, sx , sy, sWidth, sHeight, dx, dy, dWidth, dHeight); (s refers to a cut, d to real position)
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
}
