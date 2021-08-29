import Player from './Player';
import Fruit from './Fruit';
import Enemy from './Enemy';

import emptyHeart from './sprites/heart-empty.png';
import heart from './sprites/heart.png';

import banana from './sprites/banana.png';
import orange from './sprites/orange.png';
import redApple from './sprites/red-apple.png';
import strawberry from './sprites/strawberry.png';
import watermelon from './sprites/watermelon.png';

import bomb from './sprites/bomb.png';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    playWidth: PlaygroundObj;
    player: Player;
    intervalsIds: number[];
    score: number;
    fruits: Fruit[];
    enemies: Enemy[];
    floorlevel: number;
    life = 4;

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
        this.enemies = [];
        this.score = 0;
    }

    start(): void {
        this.startIntervals();
    }

    gameLoop(): void {
        //temporarily teste generation
        /*if (Math.random() > 0.99) {
            this.newEnemy();
        }*/
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
        this.enemies.forEach((Enemy) => Enemy.draw());
    }

    updateState(): void {
        this.updateFruits();
        this.updateEnemies();
        this.player.update();
    }

    updateFruits(): void {
        this.fruits.forEach((fruit) => fruit.update());
        this.fruits = this.fruits.filter((fruit) => {
            if (!fruit.isAboveFloor()) {
                this.life -= 1;
                console.log(this.life);
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

    updateEnemies(): void {
        this.enemies.forEach((enemy) => {
            enemy.update();
            if (this.player.isColliding(enemy)) {
                this.endGame();
            }
        });
        this.enemies = this.enemies.filter((enemy) => enemy.isAboveFloor());
    }

    updateScore(value: number): void {
        this.score += value;
    }

    newFruit(): void {
        const fruit = this.randomFruit();
        this.fruits.push(new Fruit(this.context, fruit.sprite, fruit.value, this.playWidth, this.floorlevel));
    }

    newEnemy(): void {
        this.enemies.push(new Enemy(this.context, bomb, this.playWidth, this.floorlevel));
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

        this.intervalsIds = [setInterval(() => this.gameLoop(), 1000 / 60), setInterval(() => this.newFruit(), 1000)];
    }

    clearIntervals(): void {
        this.intervalsIds?.forEach(clearInterval);
    }

    clearScreen(): void {
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
        } else if (random >= 70 / 100 && random <= 1) {
            return { sprite: orange, value: 5 };
        } else {
            alert('OH SHIT!');
        }
    }

    drawInfoBar(): void {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, 65);
        const empty = new Image();
        empty.src = emptyHeart;
        const full = new Image();
        full.src = heart;
        this.context.drawImage(this.life >= 1 ? full : empty, 11, 12, 40, 40);
        this.context.drawImage(this.life >= 2 ? full : empty, 53, 12, 40, 40);
        this.context.drawImage(this.life >= 3 ? full : empty, 95, 12, 40, 40);
        this.context.drawImage(this.life === 4 ? full : empty, 137, 12, 40, 40);
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
