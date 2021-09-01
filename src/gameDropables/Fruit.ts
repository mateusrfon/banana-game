import Dropable from '../abstracts/Dropable';
import Playwidth from '../interfaces/Playwidth';

export default class Fruit extends Dropable {
    value: number;

    private randomFruit(): FruitProperties {
        const random = Math.random();
        if (random < 5 / 100) {
            return { src: './assets/banana.png', value: -1 };
        } else if (random >= 5 / 100 && random < 20 / 100) {
            return { src: './assets/strawberry.png', value: 30 };
        } else if (random >= 20 / 100 && random < 40 / 100) {
            return { src: './assets/watermelon.png', value: 20 };
        } else if (random >= 40 / 100 && random < 70 / 100) {
            return { src: './assets/red-apple.png', value: 10 };
        } else if (random >= 70 / 100 && random <= 1) {
            return { src: './assets/orange.png', value: 5 };
        }
    }

    constructor(context: CanvasRenderingContext2D, xLimits: Playwidth) {
        super(context, xLimits);

        const fruit = this.randomFruit();
        const size = 1 / 20;
        this.sprite = new Image();
        this.sprite.src = fruit.src;
        this.sprite.onload = () => {
            this.sprite.height *= size;
            this.sprite.width *= size;
            this.x = this.randomBetween(this.xLimits.start, this.xLimits.end - this.sprite.width);
        };
        this.value = fruit.value;
        this.y = 65;
    }
}

interface FruitProperties {
    src: string;
    value: number;
}
