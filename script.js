class Tile {
    constructor(gridX, gridY, isTile) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.isTile = isTile;
        this.x = gridX * tilesize;
        this.y = gridY * tilesize;
        this.size = tilesize;
    }

    display() {
        if (this.isTile === 1) {
            fill(255);
            rect(this.x, this.y, this.size, this.size);
        }
    }
}

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = tilesize * 0.8;

        this.velocity = createVector(0, 0);
        this.gravity = createVector(0, 0.2);
    }

    display() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.size, this.size);
    }

    applyGravity() {
        this.velocity.add(this.gravity);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    collide(tiles) {
        this.onGround = false;

        for (let tile of tiles) {
            if (tile.isTile === 1) {

                if (
                    this.x < tile.x + tile.size &&
                    this.x + this.size > tile.x &&
                    this.y < tile.y + tile.size &&
                    this.y + this.size > tile.y
                ) {
                    
                    if (this.velocity.y > 0 && this.y + this.size - this.velocity.y <= tile.y) {
                        this.y = tile.y - this.size;
                        this.velocity.y = 0;
                        this.onGround = true;
                    }

                    else if (this.velocity.y < 0 && this.y - this.velocity.y >= tile.y + tile.size) {
                        this.y = tile.y + tile.size;
                        this.velocity.y = 0;
                    }

                    else if (this.velocity.x > 0) {
                        this.x = tile.x - this.size;
                        this.velocity.x = 0;
                    }

                    else if (this.velocity.x < 0) {
                        this.x = tile.x + tile.size;
                        this.velocity.x = 0;
                    }
                }
            }
        }
    }
}

let level_1 = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

let tilesArr = [];
let tilesize = 35;
let player;
let current_level;

function setup() {
    createCanvas(windowWidth, windowHeight);
    player = new Player();
    current_level = level_1;

    for (let y = 0; y < current_level.length; y++) {
        for (let x = 0; x < current_level[y].length; x++) {
            tilesArr.push(new Tile(x, y, current_level[y][x]));
        }
    }
}

function draw() {
    background(0);

    for (let tile of tilesArr) {
        tile.display();
    }

    if (keyIsDown(UP_ARROW) === true && player.onGround === true) {
        player.velocity.y -= 8;
    }
    if (keyIsDown(LEFT_ARROW) === true) {
        player.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) === true) {
        player.x += 5;
    }

    player.display();
    player.collide(tilesArr);
    player.applyGravity();
}