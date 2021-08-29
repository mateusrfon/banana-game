import bomb from '../assets/bomb.png';

const size = 1 / 4;

const bombSprite = new Image();
bombSprite.src = bomb;
bombSprite.width *= size;
bombSprite.height *= size;

export default bombSprite;
