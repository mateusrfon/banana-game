import Drawable from './abstracts/Drawable';
import Playwidth from './interfaces/Playwidth';

export default class Player extends Drawable {
    private _speed: number;
    private _moveLeft = false;
    private _moveRight = false;
    private spriteLeft = new Image();
    private spriteRight = new Image();

    constructor(context: CanvasRenderingContext2D, xLimits: Playwidth) {
        super(context, xLimits);

        const size = 1 / 5;
        this.spriteRight.src = './assets/alienFacingRight.png';
        this.spriteRight.onload = () => {
            this.spriteRight.height *= size;
            this.spriteRight.width *= size;
        };
        this.spriteLeft.src = './assets/alienFacingLeft.png';
        this.spriteLeft.onload = () => {
            this.spriteLeft.height *= size;
            this.spriteLeft.width *= size;
        };
        this.sprite = this.spriteRight;
        this.xLimits = xLimits;
        this.x = (xLimits.end + xLimits.start) / 2;
        this.speed = 0;
    }

    faceLeft(): void {
        this.sprite = this.spriteLeft;
    }

    faceRight(): void {
        this.sprite = this.spriteRight;
    }

    setMoveLeft(): void {
        this._moveLeft = true;
        this._moveRight = false;
    }

    setMoveRight(): void {
        this._moveLeft = false;
        this._moveRight = true;
    }

    stopMovingLeft(): void {
        this._moveLeft = false;
    }

    stopMovingRight(): void {
        this._moveRight = false;
    }

    update(): void {
        if (this.x - this._speed >= this.xLimits.start && this._moveLeft) {
            this.x -= this._speed;
            this.faceLeft();
        }
        if (this.x + this._speed + this.sprite.width <= this.xLimits.end && this._moveRight) {
            this.x += this._speed;
            this.faceRight();
        }
    }

    set speed(speed: number) {
        this._speed = speed;
    }

    isColliding(obj: Drawable): boolean {
        const xRange = this.x < obj.x + obj.sprite.width && this.x + this.sprite.width > obj.x;
        const yRange = this.y < obj.y + obj.sprite.width && this.y + this.sprite.width > obj.y;
        return xRange && yRange;
    }
}
