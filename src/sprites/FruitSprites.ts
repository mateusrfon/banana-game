import bananaSRC from '../assets/banana.png';
import orangeSRC from '../assets/orange.png';
import redAppleSRC from '../assets/red-apple.png';
import strawberrySRC from '../assets/strawberry.png';
import watermelonSRC from '../assets/watermelon.png';

const fruitsSize = 1 / 20;

const banana = new Image();
banana.src = bananaSRC;
banana.width *= fruitsSize;
banana.height *= fruitsSize;

const orange = new Image();
orange.src = orangeSRC;
orange.width *= fruitsSize;
orange.height *= fruitsSize;

const redApple = new Image();
redApple.src = redAppleSRC;
redApple.width *= fruitsSize;
redApple.height *= fruitsSize;

const strawberry = new Image();
strawberry.src = strawberrySRC;
strawberry.width *= fruitsSize;
strawberry.height *= fruitsSize;

const watermelon = new Image();
watermelon.src = watermelonSRC;
watermelon.width *= fruitsSize;
watermelon.height *= fruitsSize;

export { banana, orange, redApple, strawberry, watermelon };
