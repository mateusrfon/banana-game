import Drawable from './Drawable';

export default class Dropable extends Drawable {
    value: number;

    constructor(
        context: CanvasRenderingContext2D,
        sprite: HTMLImageElement,
        value: number,
        playLimits: Playwidth,
        floorLevel: number,
    ) {
        super(context, sprite, sprite.width, sprite.height, playLimits, floorLevel);

        this.value = value;
        this.x = this.randomX();
    }

    update(): void {
        this.y += (3 * 543) / this.floorLevel;
    }

    randomX(): number {
        const xPos = Math.random() * (this.playLimits.end - this.playLimits.start);
        return xPos + this.playLimits.start;
    }

    isAboveFloor(): boolean {
        return this.y + this.height < this.floorLevel;
    }
}

interface Playwidth {
    start: number;
    end: number;
}
