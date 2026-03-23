let tilesArr = [];
let tilesize = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let x = 0; x < width; x += tilesize) {
        for (let y = 0; y < height; y += tilesize) {
            tilesArr.push(new Tile(x, y));
        }
    }
}

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = tilesize;
    }
    display() {
        fill(255);
        rect(this.x, this.y, this.size, this.size);
    }


}

function draw() {
    background(0);
    for (let tile of tilesArr) {
        tile.display();
    }
}