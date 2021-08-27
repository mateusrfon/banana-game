import Game from './Game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const screenWidth = window.innerWidth - 20;
const screenHeight = window.innerHeight - 20;

const game = new Game(canvas, screenWidth, screenHeight);
game.start();

window.addEventListener('keydown', (event: KeyboardEvent) => {
    game.onArrowDown(event);
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
    game.onArrowUp(event);
});
