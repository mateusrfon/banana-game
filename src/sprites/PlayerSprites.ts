import alienFacingRight from '../assets/alienFacingRight.png';
import alienFacingLeft from '../assets/alienFacingLeft.png';

const playerSize = 1 / 5;

const spriteFacingLeft = new Image();
spriteFacingLeft.src = alienFacingLeft;
spriteFacingLeft.width *= playerSize;
spriteFacingLeft.height *= playerSize;

const spriteFacingRight = new Image();
spriteFacingRight.src = alienFacingRight;
spriteFacingRight.width *= playerSize;
spriteFacingRight.height *= playerSize;

const playerSprites = {
    facingLeft: spriteFacingLeft,
    facingRight: spriteFacingRight,
};

export default playerSprites;
