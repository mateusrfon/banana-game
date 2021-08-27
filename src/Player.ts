import Drawable from './Drawable';
import alienFacingRight from './sprites/alienFacingRight.png';
import alienFacingLeft from './sprites/alienFacingLeft.png';

export default class Player extends Drawable {
    floorLevel: number;
    moveLeft: boolean;
    moveRight: boolean;

    constructor(context: CanvasRenderingContext2D, floorLevel: number, playWidth: Playwidth) {
        const image = new Image();
        image.src = alienFacingRight;
        const size = 1 / 5;
        super(context, image, image.width * size, image.height * size, playWidth, floorLevel);

        this.y = floorLevel - image.height * size;
        this.moveLeft = false;
        this.moveRight = false;
        this.playPoints = playWidth;
    }

    move(direction: string): void {
        if (direction === 'left') {
            this.sprite.src = alienFacingLeft;
            if (this.x >= this.playPoints.start) this.x -= 5;
        } else {
            this.sprite.src = alienFacingRight;
            if (this.x <= this.playPoints.end - this.width) this.x += 5;
        }
    }

    update(): void {
        if (this.moveLeft) {
            this.move('left');
        } else if (this.moveRight) {
            this.move('right');
        }
    }

    checkColission(obj: Drawable): boolean {
        const yDist = this.y - obj.y;
        const xDist = this.x - obj.x;
        return yDist < 0 && xDist < 0;
    }
}

interface Playwidth {
    start: number;
    end: number;
}
