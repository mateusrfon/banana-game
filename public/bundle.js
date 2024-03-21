/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _dropables_Fruit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropables/Fruit */ \"./src/dropables/Fruit.ts\");\n/* harmony import */ var _dropables_Bomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropables/Bomb */ \"./src/dropables/Bomb.ts\");\n/* harmony import */ var _HeartSprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeartSprites */ \"./src/HeartSprites.ts\");\n\r\n\r\n\r\n\r\nclass Game {\r\n    constructor(canvas, screenWidth, screenHeight) {\r\n        this.canvas = canvas;\r\n        this.canvas.width = screenWidth;\r\n        this.canvas.height = screenHeight;\r\n        this.context = this.canvas.getContext('2d');\r\n        this.xLimits = {\r\n            start: screenWidth * 0.01,\r\n            end: screenWidth - screenWidth * 0.01 * 2,\r\n        };\r\n        this.floorLevel = screenHeight - 27;\r\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.context, this.xLimits);\r\n        this.intervalsIds = [];\r\n        this.fruits = [];\r\n        this.bombs = [];\r\n        this.score = 0;\r\n        this.life = 4;\r\n        this.dropableSpeed = (3 * 543) / this.floorLevel;\r\n        this.eatAudio = new Audio('./assets/eat.mp3');\r\n        this.eat2Audio = new Audio('./assets/eat2.mp3');\r\n        this.bananaAudio = new Audio('./assets/nicenana.mp3');\r\n        this.bombAudio = new Audio('./assets/bomb.mp3');\r\n    }\r\n    drawGameStart() {\r\n        const newGameString = \"Press 'Enter' to start\";\r\n        const newGameStringWidth = this.context.measureText(newGameString).width;\r\n        const width = (this.canvas.width - newGameStringWidth) / 2;\r\n        const height = this.canvas.height / 2;\r\n        this.context.fillStyle = 'white';\r\n        this.context.font = '24px Lato';\r\n        this.context.fillText(newGameString, width, height);\r\n    }\r\n    setPlayer() {\r\n        this.player.speed = (5 * (this.xLimits.end - this.xLimits.start)) / 800;\r\n        this.player.x = (this.xLimits.end + this.xLimits.start) / 2;\r\n        this.player.y = this.floorLevel - this.player.sprite.height;\r\n    }\r\n    setGame() {\r\n        this.setPlayer();\r\n        this.fruits = [];\r\n        this.bombs = [];\r\n        this.score = 0;\r\n        this.life = 4;\r\n    }\r\n    start() {\r\n        if (this.intervalsIds.length > 0)\r\n            return;\r\n        this.setGame();\r\n        this.startIntervals();\r\n    }\r\n    gameLoop() {\r\n        this.updateState();\r\n        this.renderGame();\r\n    }\r\n    endGame() {\r\n        this.clearIntervals();\r\n        this.intervalsIds = [];\r\n        setTimeout(() => this.drawGameOver(), 100);\r\n    }\r\n    drawGameOver() {\r\n        const width = this.canvas.width;\r\n        const height = this.canvas.height / 2;\r\n        const gameOverString = 'Game Over';\r\n        const scoreString = `Score: ${this.score}`;\r\n        const reStartString = \"Press 'Enter' to re-start\";\r\n        const gameOverStringWidth = this.context.measureText(gameOverString).width;\r\n        const scoreStringWidth = this.context.measureText(scoreString).width;\r\n        const reStartStringWidth = this.context.measureText(reStartString).width;\r\n        this.context.fillStyle = 'white';\r\n        this.context.font = '24px Lato';\r\n        this.context.fillText(gameOverString, (width - gameOverStringWidth) / 2, height - 50);\r\n        this.context.fillText(scoreString, (width - scoreStringWidth) / 2, height);\r\n        this.context.fillText(reStartString, (width - reStartStringWidth) / 2, height + 50);\r\n    }\r\n    firstGameRender() {\r\n        this.renderGame();\r\n        this.drawGameStart();\r\n    }\r\n    renderGame() {\r\n        this.clearScreen();\r\n        this.drawInterface();\r\n        this.player.draw();\r\n        this.fruits.forEach((fruit) => fruit.draw());\r\n        this.bombs.forEach((bomb) => bomb.draw());\r\n    }\r\n    updateState() {\r\n        this.updateFruits();\r\n        this.updateBombs();\r\n        this.player.update();\r\n    }\r\n    updateFruits() {\r\n        this.fruits.forEach((fruit) => {\r\n            fruit.update();\r\n        });\r\n        this.fruits = this.fruits.filter((fruit) => {\r\n            const isAboveFloor = fruit.isAboveFloor(this.floorLevel);\r\n            if (!isAboveFloor) {\r\n                this.removeOneLife();\r\n            }\r\n            return isAboveFloor;\r\n        });\r\n        this.fruits = this.fruits.filter((fruit) => {\r\n            if (this.player.isColliding(fruit)) {\r\n                this.playFruitSound(fruit);\r\n                this.updateScore(fruit.value);\r\n                return false;\r\n            }\r\n            return true;\r\n        });\r\n    }\r\n    playFruitSound(fruit) {\r\n        if (fruit.value === -1) {\r\n            this.bananaAudio.play();\r\n        }\r\n        else {\r\n            const random = Math.random();\r\n            if (random < 0.5) {\r\n                this.eat2Audio.play();\r\n            }\r\n            else {\r\n                this.eatAudio.play();\r\n            }\r\n        }\r\n    }\r\n    removeOneLife() {\r\n        this.life -= 1;\r\n        if (this.life === 0)\r\n            this.endGame();\r\n    }\r\n    updateBombs() {\r\n        this.bombs.forEach((bomb) => {\r\n            bomb.update();\r\n            if (this.player.isColliding(bomb)) {\r\n                this.bombAudio.play();\r\n                this.endGame();\r\n            }\r\n        });\r\n        this.bombs = this.bombs.filter((bomb) => bomb.isAboveFloor(this.floorLevel));\r\n    }\r\n    updateScore(value) {\r\n        if (value === -1) {\r\n            this.score *= 2;\r\n        }\r\n        else {\r\n            this.score += value;\r\n        }\r\n    }\r\n    newFruit() {\r\n        const fruit = new _dropables_Fruit__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.context, this.xLimits);\r\n        fruit.speed = this.dropableSpeed;\r\n        this.fruits.push(fruit);\r\n    }\r\n    newBomb() {\r\n        const bomb = new _dropables_Bomb__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.context, this.xLimits);\r\n        bomb.speed = this.dropableSpeed * 1.2;\r\n        this.bombs.push(bomb);\r\n    }\r\n    onArrowDown(event) {\r\n        if (event.key === 'ArrowLeft' && this.player.x >= this.xLimits.start) {\r\n            this.player.setMoveLeft();\r\n        }\r\n        if (event.key === 'ArrowRight' && this.player.x <= this.xLimits.end - this.player.sprite.width) {\r\n            this.player.setMoveRight();\r\n        }\r\n    }\r\n    onArrowUp(event) {\r\n        if (event.key === 'ArrowLeft') {\r\n            this.player.stopMovingLeft();\r\n        }\r\n        if (event.key === 'ArrowRight') {\r\n            this.player.stopMovingRight();\r\n        }\r\n    }\r\n    startIntervals() {\r\n        this.clearIntervals();\r\n        const { setInterval } = window;\r\n        this.intervalsIds = [\r\n            setInterval(() => this.gameLoop(), 1000 / 60),\r\n            setInterval(() => this.newFruit(), 2000),\r\n            setInterval(() => this.newBomb(), 5000),\r\n        ];\r\n    }\r\n    clearIntervals() {\r\n        var _a;\r\n        (_a = this.intervalsIds) === null || _a === void 0 ? void 0 : _a.forEach(clearInterval);\r\n    }\r\n    clearScreen() {\r\n        this.context.fillStyle = '#181820';\r\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.context.fillStyle = 'white';\r\n        this.context.fillRect(this.xLimits.start, this.canvas.height - 27, this.xLimits.end, 1);\r\n    }\r\n    drawInterface() {\r\n        this.context.fillStyle = 'black';\r\n        this.context.fillRect(0, 0, this.canvas.width, 65);\r\n        this.drawHearts();\r\n        this.drawScore();\r\n    }\r\n    drawHearts() {\r\n        this.context.drawImage(this.life >= 1 ? _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.full : _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.empty, 11, 12, 40, 40);\r\n        this.context.drawImage(this.life >= 2 ? _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.full : _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.empty, 53, 12, 40, 40);\r\n        this.context.drawImage(this.life >= 3 ? _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.full : _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.empty, 95, 12, 40, 40);\r\n        this.context.drawImage(this.life === 4 ? _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.full : _HeartSprites__WEBPACK_IMPORTED_MODULE_3__.empty, 137, 12, 40, 40);\r\n    }\r\n    drawScore() {\r\n        this.context.fillStyle = 'white';\r\n        this.context.font = '24px Lato';\r\n        this.context.fillText(`Score: ${this.score}`, this.canvas.width - 154, 40);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/Game.ts?");

/***/ }),

/***/ "./src/HeartSprites.ts":
/*!*****************************!*\
  !*** ./src/HeartSprites.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   empty: () => (/* binding */ empty),\n/* harmony export */   full: () => (/* binding */ full)\n/* harmony export */ });\nconst empty = new Image();\r\nempty.src = './assets/heart-empty.png';\r\nconst full = new Image();\r\nfull.src = './assets/heart.png';\r\n\r\n\n\n//# sourceURL=webpack://bananagame/./src/HeartSprites.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _abstracts_Drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstracts/Drawable */ \"./src/abstracts/Drawable.ts\");\n\r\nclass Player extends _abstracts_Drawable__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(context, xLimits) {\r\n        super(context, xLimits);\r\n        this._moveLeft = false;\r\n        this._moveRight = false;\r\n        this.spriteLeft = new Image();\r\n        this.spriteRight = new Image();\r\n        const size = 1 / 5;\r\n        this.spriteRight.src = './assets/alienFacingRight.png';\r\n        this.spriteRight.onload = () => {\r\n            this.spriteRight.height *= size;\r\n            this.spriteRight.width *= size;\r\n        };\r\n        this.spriteLeft.src = './assets/alienFacingLeft.png';\r\n        this.spriteLeft.onload = () => {\r\n            this.spriteLeft.height *= size;\r\n            this.spriteLeft.width *= size;\r\n        };\r\n        this.sprite = this.spriteRight;\r\n        this.xLimits = xLimits;\r\n        this.x = (xLimits.end + xLimits.start) / 2;\r\n        this.speed = 0;\r\n    }\r\n    faceLeft() {\r\n        this.sprite = this.spriteLeft;\r\n    }\r\n    faceRight() {\r\n        this.sprite = this.spriteRight;\r\n    }\r\n    setMoveLeft() {\r\n        this._moveLeft = true;\r\n        this._moveRight = false;\r\n    }\r\n    setMoveRight() {\r\n        this._moveLeft = false;\r\n        this._moveRight = true;\r\n    }\r\n    stopMovingLeft() {\r\n        this._moveLeft = false;\r\n    }\r\n    stopMovingRight() {\r\n        this._moveRight = false;\r\n    }\r\n    update() {\r\n        if (this.x - this._speed >= this.xLimits.start && this._moveLeft) {\r\n            this.x -= this._speed;\r\n            this.faceLeft();\r\n        }\r\n        if (this.x + this._speed + this.sprite.width <= this.xLimits.end && this._moveRight) {\r\n            this.x += this._speed;\r\n            this.faceRight();\r\n        }\r\n    }\r\n    set speed(speed) {\r\n        this._speed = speed;\r\n    }\r\n    isColliding(obj) {\r\n        const xRange = this.x < obj.x + obj.sprite.width && this.x + this.sprite.width > obj.x;\r\n        const yRange = this.y < obj.y + obj.sprite.width && this.y + this.sprite.width > obj.y;\r\n        return xRange && yRange;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/Player.ts?");

/***/ }),

/***/ "./src/abstracts/Drawable.ts":
/*!***********************************!*\
  !*** ./src/abstracts/Drawable.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Drawable)\n/* harmony export */ });\nclass Drawable {\r\n    constructor(context, xLimits) {\r\n        this.context = context;\r\n        this.xLimits = xLimits;\r\n    }\r\n    draw() {\r\n        this.context.beginPath();\r\n        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);\r\n        //image, sx , sy, sWidth, sHeight, dx, dy, dWidth, dHeight); (s refers to a cut, d to real position)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/abstracts/Drawable.ts?");

/***/ }),

/***/ "./src/abstracts/Dropable.ts":
/*!***********************************!*\
  !*** ./src/abstracts/Dropable.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dropable)\n/* harmony export */ });\n/* harmony import */ var _Drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Drawable */ \"./src/abstracts/Drawable.ts\");\n\r\nclass Dropable extends _Drawable__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    randomBetween(start, end) {\r\n        return Math.random() * (end - start) + start;\r\n    }\r\n    constructor(context, xLimits) {\r\n        super(context, xLimits);\r\n        this.y = 65;\r\n    }\r\n    update() {\r\n        this.y += this.speed;\r\n    }\r\n    isAboveFloor(floorLevel) {\r\n        return this.y + this.sprite.height < floorLevel;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/abstracts/Dropable.ts?");

/***/ }),

/***/ "./src/dropables/Bomb.ts":
/*!*******************************!*\
  !*** ./src/dropables/Bomb.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bomb)\n/* harmony export */ });\n/* harmony import */ var _abstracts_Dropable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstracts/Dropable */ \"./src/abstracts/Dropable.ts\");\n\r\nclass Bomb extends _abstracts_Dropable__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(context, xLimits) {\r\n        super(context, xLimits);\r\n        const size = 1 / 4;\r\n        this.sprite = new Image();\r\n        this.sprite.src = './assets/bomb.png';\r\n        this.sprite.onload = () => {\r\n            this.sprite.height *= size;\r\n            this.sprite.width *= size;\r\n            this.x = this.randomBetween(this.xLimits.start, this.xLimits.end - this.sprite.width);\r\n        };\r\n        this.y = 65;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/dropables/Bomb.ts?");

/***/ }),

/***/ "./src/dropables/Fruit.ts":
/*!********************************!*\
  !*** ./src/dropables/Fruit.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Fruit)\n/* harmony export */ });\n/* harmony import */ var _abstracts_Dropable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstracts/Dropable */ \"./src/abstracts/Dropable.ts\");\n\r\nclass Fruit extends _abstracts_Dropable__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    randomFruit() {\r\n        const random = Math.random();\r\n        if (random < 5 / 100) {\r\n            return { src: './assets/banana.png', value: -1 };\r\n        }\r\n        else if (random >= 5 / 100 && random < 20 / 100) {\r\n            return { src: './assets/strawberry.png', value: 30 };\r\n        }\r\n        else if (random >= 20 / 100 && random < 40 / 100) {\r\n            return { src: './assets/watermelon.png', value: 20 };\r\n        }\r\n        else if (random >= 40 / 100 && random < 70 / 100) {\r\n            return { src: './assets/red-apple.png', value: 10 };\r\n        }\r\n        else if (random >= 70 / 100 && random <= 1) {\r\n            return { src: './assets/orange.png', value: 5 };\r\n        }\r\n    }\r\n    constructor(context, xLimits) {\r\n        super(context, xLimits);\r\n        const fruit = this.randomFruit();\r\n        const size = 1 / 20;\r\n        this.sprite = new Image();\r\n        this.sprite.src = fruit.src;\r\n        this.sprite.onload = () => {\r\n            this.sprite.height *= size;\r\n            this.sprite.width *= size;\r\n            this.x = this.randomBetween(this.xLimits.start, this.xLimits.end - this.sprite.width);\r\n        };\r\n        this.value = fruit.value;\r\n        this.y = 65;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bananagame/./src/dropables/Fruit.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nconst canvas = document.getElementById('canvas');\r\nconst screenWidth = window.innerWidth - 20;\r\nconst screenHeight = window.innerHeight - 20;\r\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, screenWidth, screenHeight);\r\ngame.firstGameRender();\r\nwindow.addEventListener('keydown', (event) => {\r\n    game.onArrowDown(event);\r\n});\r\nwindow.addEventListener('keyup', (event) => {\r\n    game.onArrowUp(event);\r\n});\r\nwindow.addEventListener('keydown', (event) => {\r\n    if (event.key === 'Enter') {\r\n        game.start();\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://bananagame/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;