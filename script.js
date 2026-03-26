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
        this.x = 3 * tilesize;
        this.y = 25 * tilesize;
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

    collide(tiles,crates) {
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
        for (let crate of crates) {
            if (
                this.x < crate.x + crate.xSize * tilesize &&
                this.x + this.size > crate.x &&
                this.y < crate.y + crate.ySize * tilesize &&
                this.y + this.size > crate.y
            ) {
                
                if (this.velocity.y > 0 && this.y + this.size - this.velocity.y <= crate.y) {
                    this.y = crate.y - this.size;
                    this.velocity.y = 0;
                    this.onGround = true;
                }

                else if (this.velocity.y < 0 && this.y - this.velocity.y >= crate.y + crate.ySize * tilesize) {
                    this.y = crate.y + crate.ySize * tilesize;
                    this.velocity.y = 0;
                }

                else if (this.velocity.x > 0) {
                    this.x = crate.x - this.size;
                    this.velocity.x = 0;
                }

                else if (this.velocity.x < 0) {
                    this.x = crate.x + crate.xSize * tilesize;
                    this.velocity.x = 0;
                }
            }
        }
    }
}

class Crate {
    constructor(x, y, xSize, ySize) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.velocity = createVector(0, 0);
        this.friction = createVector(0, 0);
    }

    display() {
        fill(0, 0, 255); //Blue fill for objects
        rect(this.x, this.y, this.xSize * tilesize, this.ySize * tilesize);
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

class Crate {
    constructor(x, y, xSize, ySize) {
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
    }

    display() {
        fill(0, 0, 255); //Blue fill for objects
        rect(this.x, this.y, this.xSize * tilesize, this.ySize * tilesize);
    }
}

class Door{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xSize = tilesize;
        this.ySize = tilesize * 3;
    }

    display() {
        fill(255, 255, 0); // Yellow fill for doors
        rect(this.x, this.y, this.xSize, this.ySize);
    }
    //openDoor() {
    //    if(winCondition)
}

class Spring {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = tilesize * 0.25;
    }

    display() {
        fill(255, 0, 255);
        rect(this.x, this.y, 4 * this.size, this.size);
    }

    spring(){
        if(player.x < this.x + 4*this.size &&
           player.x + player.size > this.x &&
           player.y < this.y + this.size &&
           player.y + player.size > this.y &&
           player.velocity.y > 0 &&
           player.y + player.size - player.velocity.y <= this.y) {

            player.y = this.y - player.size;
            player.velocity.y = -10; // launch upward
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

let doorsArr = [];
let tilesArr = [];
let springArr = [];
let crateArr = [];
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

    let crate1 = new Crate(560, 175, 2, 2);
    crateArr.push(crate1);

    let spring1 = new Spring(910, 385 + 2*tilesize);
    springArr.push(spring1);
    let spring2 = new Spring(350, 175 + 2*tilesize);
    springArr.push(spring2);

    let door1 = new Door(1225, 175 - tilesize);
    doorsArr.push(door1);
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
        player.velocity.x = -5;
    }else if (keyIsDown(RIGHT_ARROW) === true) {
        player.velocity.x = 5;
    }else {
        player.velocity.x = 0;
    }

    player.display();
    player.applyGravity();
    player.collide(tilesArr, crateArr);
    springArr.forEach(spring => spring.spring());

    if(crateArr.length > 0) {
        for(let i = 0; i < crateArr.length; i++) {
            crateArr[i].display();
        }
    }

    if(springArr.length > 0) {
        for(let i = 0; i < springArr.length; i++) {
            springArr[i].display();
        }
    }

    if(doorsArr.length > 0) {
        for(let i = 0; i < doorsArr.length; i++) {
            doorsArr[i].display();
        }
    }
}