import Player from './Player';
import Dropable from './Dropable';

import { banana, orange, redApple, strawberry, watermelon } from './sprites/FruitSprites';
import * as heart from './sprites/HeartSprites';
import bombSprite from './sprites/BombSprite';
import playerSprites from './sprites/PlayerSprites';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    playLimits: PlaygroundObj;
    player: Player;
    intervalsIds: number[];
    score: number;
    fruits: Dropable[];
    bombs: Dropable[];
    floorlevel: number;
    life = 4;

    constructor(canvas: HTMLCanvasElement, screenWidth: number, screenHeight: number) {
        this.canvas = canvas;
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext('2d');
        this.playLimits = {
            start: screenWidth * 0.01,
            end: screenWidth - screenWidth * 0.01 * 2,
        };
        this.floorlevel = screenHeight - 27;
        this.player = new Player(this.context, playerSprites, this.playLimits, this.floorlevel);
        this.fruits = [];
        this.bombs = [];
        this.score = 0;
    }

    start(): void {
        this.startIntervals();
    }

    gameLoop(): void {
        this.updateState();
        this.renderGame();
    }

    endGame(): void {
        this.clearIntervals();
        alert('Game over! Score: ' + this.score);
    }

    renderGame(): void {
        this.clearScreen();
        this.drawInfoBar();
        // desenhar score
        this.player.draw();
        this.fruits.forEach((fruit) => fruit.draw());
        this.bombs.forEach((bomb) => bomb.draw());
    }

    updateState(): void {
        this.updateFruits();
        this.updateBombs();
        this.player.update();
    }

    updateFruits(): void {
        this.fruits.forEach((fruit) => fruit.update());
        this.fruits = this.fruits.filter((fruit) => {
            if (!fruit.isAboveFloor()) {
                this.life -= 1;
                if (this.life === 0) this.endGame();
            }
            return fruit.isAboveFloor();
        });
        this.fruits = this.fruits.filter((fruit) => {
            if (this.player.isColliding(fruit)) {
                this.updateScore(fruit.value);
                return false;
            }
            return true;
        });
    }

    updateBombs(): void {
        this.bombs.forEach((bomb) => {
            bomb.update();
            if (this.player.isColliding(bomb)) {
                this.endGame();
            }
        });
        this.bombs = this.bombs.filter((bomb) => bomb.isAboveFloor());
    }

    updateScore(value: number): void {
        this.score += value;
    }

    newFruit(): void {
        const fruit = this.randomFruit();
        this.fruits.push(new Dropable(this.context, fruit.sprite, fruit.value, this.playLimits, this.floorlevel));
    }

    newBomb(): void {
        this.bombs.push(new Dropable(this.context, bombSprite, 0, this.playLimits, this.floorlevel));
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

        this.intervalsIds = [
            setInterval(() => this.gameLoop(), 1000 / 60),
            setInterval(() => this.newFruit(), 2000),
            setInterval(() => this.newBomb(), 5000),
        ];
    }

    clearIntervals(): void {
        this.intervalsIds?.forEach(clearInterval);
    }

    clearScreen(): void {
        this.context.fillStyle = '#181820';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.fillRect(this.playLimits.start, this.canvas.height - 27, this.playLimits.end, 1);
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
        } else if (random >= 70 / 100 && random <= 1) {
            return { sprite: orange, value: 5 };
        }
    }

    drawInfoBar(): void {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, 65);
        this.drawHearts();
        this.drawScore();
    }

    drawHearts(): void {
        this.context.drawImage(this.life >= 1 ? heart.full : heart.empty, 11, 12, 40, 40);
        this.context.drawImage(this.life >= 2 ? heart.full : heart.empty, 53, 12, 40, 40);
        this.context.drawImage(this.life >= 3 ? heart.full : heart.empty, 95, 12, 40, 40);
        this.context.drawImage(this.life === 4 ? heart.full : heart.empty, 137, 12, 40, 40);
    }

    drawScore(): void {
        this.context.fillStyle = 'white';
        this.context.font = '24px Lato';
        this.context.fillText(`Score: ${this.score}`, this.canvas.width - 154, 40);
    }
}

interface PlaygroundObj {
    start: number;
    end: number;
}

interface FruitProperties {
    sprite: HTMLImageElement;
    value: number;
}
