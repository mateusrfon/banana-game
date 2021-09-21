import Player from './Player';
import Fruit from './dropables/Fruit';
import Bomb from './dropables/Bomb';

import * as heart from './HeartSprites';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    xLimits: PlaygroundObj;
    player: Player;
    intervalsIds: number[];
    score: number;
    fruits: Fruit[];
    bombs: Bomb[];
    floorLevel: number;
    life: number;
    dropableSpeed: number;

    constructor(canvas: HTMLCanvasElement, screenWidth: number, screenHeight: number) {
        this.canvas = canvas;
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext('2d');
        this.xLimits = {
            start: screenWidth * 0.01,
            end: screenWidth - screenWidth * 0.01 * 2,
        };
        this.floorLevel = screenHeight - 27;
        this.player = new Player(this.context, this.xLimits);
        this.intervalsIds = [];
        this.fruits = [];
        this.bombs = [];
        this.score = 0;
        this.life = 4;
        this.dropableSpeed = (3 * 543) / this.floorLevel;
    }

    setPlayer(): void {
        this.player.speed = (5 * (this.xLimits.end - this.xLimits.start)) / 800;
        this.player.x = (this.xLimits.end + this.xLimits.start) / 2;
        this.player.y = this.floorLevel - this.player.sprite.height;
    }

    setGame(): void {
        this.setPlayer();
        this.fruits = [];
        this.bombs = [];
        this.score = 0;
        this.life = 4;
    }

    start(): void {
        if (this.intervalsIds.length > 0) return;
        this.setGame();
        this.startIntervals();
    }

    gameLoop(): void {
        this.updateState();
        this.renderGame();
    }

    endGame(): void {
        this.clearIntervals();
        this.intervalsIds = [];
        console.log('Game over! Score: ' + this.score);
    }

    renderGame(): void {
        this.clearScreen();
        this.drawInterface();
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
        this.fruits.forEach((fruit) => {
            fruit.update();
        });
        this.fruits = this.fruits.filter((fruit) => {
            const isAboveFloor = fruit.isAboveFloor(this.floorLevel);
            if (!isAboveFloor) {
                this.removeOneLife();
            }
            return isAboveFloor;
        });
        this.fruits = this.fruits.filter((fruit) => {
            if (this.player.isColliding(fruit)) {
                this.updateScore(fruit.value);
                return false;
            }
            return true;
        });
    }

    removeOneLife(): void {
        this.life -= 1;
        if (this.life === 0) this.endGame();
    }

    updateBombs(): void {
        this.bombs.forEach((bomb) => {
            bomb.update();
            if (this.player.isColliding(bomb)) {
                this.endGame();
            }
        });
        this.bombs = this.bombs.filter((bomb) => bomb.isAboveFloor(this.floorLevel));
    }

    updateScore(value: number): void {
        if (value === -1) {
            this.score *= 2;
        } else {
            this.score += value;
        }
    }

    newFruit(): void {
        const fruit = new Fruit(this.context, this.xLimits);
        fruit.speed = this.dropableSpeed;
        this.fruits.push(fruit);
    }

    newBomb(): void {
        const bomb = new Bomb(this.context, this.xLimits);
        bomb.speed = this.dropableSpeed * 1.2;
        this.bombs.push(bomb);
    }

    onArrowDown(event: KeyboardEvent): void {
        if (event.key === 'ArrowLeft' && this.player.x >= this.xLimits.start) {
            this.player.setMoveLeft();
        }
        if (event.key === 'ArrowRight' && this.player.x <= this.xLimits.end - this.player.sprite.width) {
            this.player.setMoveRight();
        }
    }

    onArrowUp(event: KeyboardEvent): void {
        if (event.key === 'ArrowLeft') {
            this.player.stopMovingLeft();
        }
        if (event.key === 'ArrowRight') {
            this.player.stopMovingRight();
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
        this.context.fillRect(this.xLimits.start, this.canvas.height - 27, this.xLimits.end, 1);
    }

    drawInterface(): void {
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
