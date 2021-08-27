import Player from './Player';

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    intervalsIds: number[];

    constructor(canvas: HTMLCanvasElement, screenWidth: number, screenHeight: number) {
        this.canvas = canvas;
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext('2d');
        this.player = new Player(this.context, screenHeight);
    }

    start(): void {
        this.startIntervals();
    }

    gameLoop(): void {
        this.updateState();
        this.renderGame();
    }

    renderGame(): void {
        this.clearScreen();
        this.player.draw();
    }

    updateState(): void {
        this.player.update();
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
        const border = this.canvas.width * 0.98;
        this.context.fillStyle = '#181820';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.fillRect(border, this.canvas.height - 27, this.canvas.width - border * 2, 1);
    }
}
