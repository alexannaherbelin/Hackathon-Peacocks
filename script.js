


class Player { 
    constructor(name, x, y, health) {
        this.name = name;
        this.score = 0;
        this.x = x;
        this.y = y;
        this.health = health;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    addScore(points) {
        this.score += points;
    }
}

class Enemy {
    constructor(name, x, y, health) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.health = health;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

const player1 = new Player("Jeff", 0, 0, 100);
const enemy1 = new Enemy("Goblin", 10, 10, 50);

console.log(player1);
console.log(enemy1);
