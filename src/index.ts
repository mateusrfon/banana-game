import Game from './Game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const screenWidth = window.innerWidth - 20;
const screenHeight = window.innerHeight - 20;

const game = new Game(canvas, screenWidth, screenHeight);
game.firstGameRender();

window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (game.intervalsIds.length === 0) {
        game.start();
    } else {
        game.onArrowDown(event);
    }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
    game.onArrowUp(event);
});

window.addEventListener('touchstart', (event: TouchEvent) => {
    if (game.intervalsIds.length === 0) {
        game.start();
    } else {
        game.onTouchStart(event);
    }
});

window.addEventListener('touchend', () => {
    game.onTouchEnd();
});
