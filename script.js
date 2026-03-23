function setup() {
    createCanvas(windowWidth, windowHeight);

}



/* class Player {
    constructor(name, x, y, health, power) {
        this.name = name;
        this.score = 0;
        this.x = x;
        this.y = y;
        this.health = health;
        this.power = power;
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
        if (this.health === 0) {
            console.log(this.name + " has been defeated! Final Score: " + this.score);
        }
    }
    attack(enemy) {
        const damage = this.power; // Example damage value
        enemy.takeDamage(damage, this);
        this.addScore(damage); // Add points for successful attack
    }

    addScore(points) {
        this.score += points;
    }
}

class Enemy {
    constructor(name, x, y, health, damage) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.health = health;
        this.damage = damage;

    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    attack(player) {
        player.takeDamage(this.damage);
    }

    takeDamage(amount, player) {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
        if (this.health === 0) {
            console.log(this.name + " has been defeated! " + player.name + " gains 10 points!");
            player.addScore(10);
        }
    }
}

*/


function draw() {
    background(0);
    //console.log(playersArr, enemiesArr);

    // Handle player movement with arrow keys (continuous) - only if player exists
    if (playersArr.length > 0) {
        if (keyIsDown(LEFT_ARROW) && playersArr[0].x > 10) { // Keep player on screen
            playersArr[0].move(-5, 0);
        }
        if (keyIsDown(RIGHT_ARROW) && playersArr[0].x < windowWidth - 10) {
            playersArr[0].move(5, 0);
        }
        if (keyIsDown(UP_ARROW) && playersArr[0].y > 10) {
            playersArr[0].move(0, -5);
        }
        if (keyIsDown(DOWN_ARROW) && playersArr[0].y < windowHeight - 10) {
            playersArr[0].move(0, 5);
        }
    }
}

function keyPressed() {
    // Prevent default browser behavior for arrow keys to stop scrolling
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        return false; // Prevents default in p5.js
    }
}
