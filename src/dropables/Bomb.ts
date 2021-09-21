import Dropable from '../abstracts/Dropable';
import Playwidth from '../interfaces/Playwidth';

export default class Bomb extends Dropable {
    constructor(context: CanvasRenderingContext2D, xLimits: Playwidth) {
        super(context, xLimits);

        const size = 1 / 4;
        this.sprite = new Image();
        this.sprite.src = './assets/bomb.png';
        this.sprite.onload = () => {
            this.sprite.height *= size;
            this.sprite.width *= size;
            this.x = this.randomBetween(this.xLimits.start, this.xLimits.end - this.sprite.width);
        };
        this.y = 65;
    }
}
