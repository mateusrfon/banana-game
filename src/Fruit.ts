import Drawable from './Drawable';
import banana from './sprites/banana.png';
import orange from './sprites/orange.png';
import redApple from './sprites/red-apple.png';
import strawberry from './sprites/strawberry.png';
import watermelon from './sprites/watermelon.png';

/*
Existem vários tipos de fruta, cada uma dá uma pontuação diferente:
- **Laranja**: vale 5 pontos, aparece 30% das vezes
- **Maça**: vale 10 pontos, aparece 30% das vezes
- **Melancia**: vale 20 pontos, aparece 20% das vezes
- **Morango**: 30 pontos, aparece 15% das vezes
- **Banana**: Dobra os pontos do usuário, aparece 5% das vezes
*/

export default class Fruit extends Drawable {
    type: string; //se banana value = scoreAtual

    constructor(context: CanvasRenderingContext2D, sprite: string) {
        const image = new Image();
        image.src = sprite;
        const size = 1 / 5;
        super(context, image, image.width * size, image.height * size);

        const randomFruit = this.randomFruit();
        this.sprite.src = randomFruit.sprite;
        this.type = randomFruit.type;
    }

    randomFruit(): FruitProperties {
        const fruits = {
            banana: { sprite: banana, type: 'banana' },
            orange: { sprite: orange, type: 'orange' },
            redApple: { sprite: redApple, type: 'redApple' },
            strawberry: { sprite: strawberry, type: 'strawberry' },
            watermelon: { sprite: watermelon, type: 'watermelon' },
        };
        const random = Math.random();
        if (random < 5 / 100) {
            return fruits.banana;
        } else if (random >= 5 / 100 && random < 20 / 100) {
            return fruits.strawberry;
        } else if (random >= 20 / 100 && random < 40 / 100) {
            return fruits.watermelon;
        } else if (random >= 40 / 100 && random < 70 / 100) {
            return fruits.redApple;
        } else if (random >= 70 / 100 && random < 1) {
            return fruits.orange;
        }
    }

    update(): void {
        //this if this.value = 0 -> this.value = score
    }
}

interface FruitProperties {
    sprite: string;
    type: string;
}
