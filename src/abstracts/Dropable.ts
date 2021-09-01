import Drawable from './Drawable';
import Playwidth from '../interfaces/Playwidth';

export default class Dropable extends Drawable {
    speed: number;

    randomBetween(start: number, end: number): number {
        return Math.random() * (end - start) + start;
    }

    constructor(context: CanvasRenderingContext2D, xLimits: Playwidth) {
        super(context, xLimits);
        this.y = 65;
    }

    update(): void {
        this.y += this.speed;
    }

    isAboveFloor(floorLevel: number): boolean {
        return this.y + this.sprite.height < floorLevel;
    }
}
