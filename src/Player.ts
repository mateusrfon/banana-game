import Drawable from './Drawable';
import alienFacingRight from './sprites/alienFacingRight.png';
import alienFacingLeft from './sprites/alienFacingLeft.png';

export default class Player extends Drawable {
    floorLevel: number;
    moveLeft: boolean;
    moveRight: boolean;

    constructor(context: CanvasRenderingContext2D, floorLevel: number) {
        const sprite = new Image();
        sprite.src = alienFacingRight;
        const size = 1 / 5;
        super(context, sprite, sprite.width * size, sprite.height * size);

        this.y = floorLevel - sprite.height * size - 27;
        this.moveLeft = false;
        this.moveRight = false;
    }

    move(direction: string): void {
        if (direction === 'left') {
            this.sprite.src = alienFacingLeft;
            this.x -= 5;
        } else {
            this.sprite.src = alienFacingRight;
            this.x += 5;
        }
    }

    update(): void {
        if (this.moveLeft) {
            this.move('left');
        } else if (this.moveRight) {
            this.move('right');
        }
    }
}
