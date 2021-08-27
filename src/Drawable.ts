export default class Drawable {
    context: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    height: number;
    width: number;
    playPoints: Playwidth;
    private _x: number;
    private _y: number;
    floorLevel: number;

    constructor(
        context: CanvasRenderingContext2D,
        sprite: HTMLImageElement,
        width: number,
        height: number,
        playWidth: Playwidth,
        floorLevel: number,
    ) {
        this.context = context;
        this.sprite = sprite;
        this.height = height;
        this.width = width;
        this.playPoints = playWidth;
        this._x = (this.playPoints.end + this.playPoints.start) / 2;
        this._y = 0;
        this.floorLevel = floorLevel;
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

interface Playwidth {
    start: number;
    end: number;
}
