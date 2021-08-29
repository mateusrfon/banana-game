import Drawable from './Drawable';

export default class Enemy extends Drawable {
    constructor(context: CanvasRenderingContext2D, sprite: string, playLimits: Playwidth, floorLevel: number) {
        const image = new Image();
        image.src = sprite;
        const size = 1 / 4;
        super(context, image, image.width * size, image.height * size, playLimits, floorLevel);

        this.x = this.randomX();
    }

    update(): void {
        this.y += 3;
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
