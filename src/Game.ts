import Player from './Player';
import Fruit from './Fruit';

import banana from './sprites/banana.png';
import orange from './sprites/orange.png';
import redApple from './sprites/red-apple.png';
import strawberry from './sprites/strawberry.png';
import watermelon from './sprites/watermelon.png';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    playWidth: PlaygroundObj;
    player: Player;
    intervalsIds: number[];
    score: number;
    fruits: Fruit[];
    floorlevel: number;

    constructor(canvas: HTMLCanvasElement, screenWidth: number, screenHeight: number) {
        this.canvas = canvas;
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext('2d');
        this.playWidth = {
            start: screenWidth * 0.01,
            end: screenWidth - screenWidth * 0.01 * 2,
        };
        this.floorlevel = screenHeight - 27;
        this.player = new Player(this.context, this.floorlevel, this.playWidth);
        this.fruits = [];
        this.score = 0;
    }

    start(): void {
        this.startIntervals();
    }

    gameLoop(): void {
        if (Math.random() > 0.95) {
            this.newFruit();
        }
        this.updateState();
        this.renderGame();
    }

    renderGame(): void {
        this.clearScreen();
        this.player.draw();
        this.fruits.forEach((fruit) => fruit.draw());
    }

    updateState(): void {
        this.updateFruits();
        this.player.update();
    }

    updateFruits(): void {
        this.fruits.forEach((fruit) => fruit.update());
        this.fruits = this.fruits.filter((fruit) => fruit.checkFloor());
        this.fruits = this.fruits.filter((fruit) => !this.player.checkColission(fruit));
    }

    updateScore(value: number): void {
        this.score += value;
    }

    newFruit(): void {
        const fruit = this.randomFruit();
        this.fruits.push(new Fruit(this.context, fruit.sprite, fruit.value, this.playWidth, this.floorlevel));
    }

    onArrowDown(event: KeyboardEvent): void {
        if (event.key === 'ArrowLeft') {
            this.player.moveLeft = true;
            this.player.moveRight = false;
        } else if (event.key === 'ArrowRight') {
            this.player.moveLeft = false;
            this.player.moveRight = true;
        }
    }

    onArrowUp(event: KeyboardEvent): void {
        if (event.key === 'ArrowLeft') {
            this.player.moveLeft = false;
        } else if (event.key === 'ArrowRight') {
            this.player.moveRight = false;
        }
    }

    startIntervals(): void {
        this.clearIntervals();
        const { setInterval } = window;

        this.intervalsIds = [setInterval(() => this.gameLoop(), 1000 / 60)];
    }

    clearIntervals(): void {
        this.intervalsIds?.forEach(clearInterval);
    }

    clearScreen(): void {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#181820';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.fillRect(this.playWidth.start, this.canvas.height - 27, this.playWidth.end, 1);
    }

    randomFruit(): FruitProperties {
        const random = Math.random();
        if (random < 5 / 100) {
            return { sprite: banana, value: 0 };
        } else if (random >= 5 / 100 && random < 20 / 100) {
            return { sprite: strawberry, value: 30 };
        } else if (random >= 20 / 100 && random < 40 / 100) {
            return { sprite: watermelon, value: 20 };
        } else if (random >= 40 / 100 && random < 70 / 100) {
            return { sprite: redApple, value: 10 };
        } else if (random >= 70 / 100 && random < 1) {
            return { sprite: orange, value: 5 };
        } else {
            console.log('something wrong');
        }
    }
}

interface PlaygroundObj {
    start: number;
    end: number;
}

interface FruitProperties {
    sprite: string;
    value: number;
}
