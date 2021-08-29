import Drawable from './Drawable';

export default class Player extends Drawable {
    floorLevel: number;
    sprites: PlayerSpritesInterface;
    moveLeft: boolean;
    moveRight: boolean;

    constructor(
        context: CanvasRenderingContext2D,
        sprites: PlayerSpritesInterface,
        playLimits: Playwidth,
        floorLevel: number,
    ) {
        const width = sprites.facingRight.width;
        const height = sprites.facingRight.height;
        super(context, sprites.facingRight, width, height, playLimits, floorLevel);

        this.sprites = sprites;
        this.y = floorLevel - height;
        this.moveLeft = false;
        this.moveRight = false;
        this.playLimits = playLimits;
    }

    move(direction: string): void {
        const speed = (5 * (this.playLimits.end - this.playLimits.start)) / 800;
        if (direction === 'left') {
            this.sprite = this.sprites.facingLeft;
            if (this.x >= this.playLimits.start) this.x -= speed;
        } else {
            this.sprite = this.sprites.facingRight;
            if (this.x <= this.playLimits.end - this.width) this.x += speed;
        }
    }

    update(): void {
        if (this.moveLeft) {
            this.move('left');
        } else if (this.moveRight) {
            this.move('right');
        }
    }

    isColliding(obj: Drawable): boolean {
        const xRange = this.x < obj.x + obj.width && this.x + this.width > obj.x;
        const yRange = this.y < obj.y + obj.width && this.y + this.width > obj.y;
        return xRange && yRange;
    }
}

interface Playwidth {
    start: number;
    end: number;
}

interface PlayerSpritesInterface {
    facingLeft: HTMLImageElement;
    facingRight: HTMLImageElement;
}
