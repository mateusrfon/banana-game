import Drawable from './Drawable';
import alien from './sprites/alien.png';

export default class Player extends Drawable {
    floorLevel: number;
    moveLeft: boolean;
    moveRight: boolean;

    constructor(context: CanvasRenderingContext2D, floorLevel: number) {
        const image = new Image();
        image.src = alien;
        const size = 1 / 5;
        super(context, image, image.width * size, image.height * size);

        this.y = floorLevel - image.height * size;
        this.moveLeft = false;
        this.moveRight = false;
    }

    move(direction: string): void {
        direction === 'left' ? (this.x -= 5) : (this.x += 5);
    }

    update(): void {
        if (this.moveLeft) {
            this.move('left');
        } else if (this.moveRight) {
            this.move('right');
        }
    }
}
