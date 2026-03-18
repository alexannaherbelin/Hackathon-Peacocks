
let playersArr = [];
let enemiesArr = [];



function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Initialize players and enemies
    playersArr.push(new Player("Jeff", 100, 100, 100, 20));
    enemiesArr.push(new Enemy("Goblin", 300, 200, 50, 10));
}



class Player {
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




function draw() {
    background(0);
    //console.log(playersArr, enemiesArr);

    // Handle player movement with arrow keys (continuous)
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

    //Drawing the players and enemys as circles
    for(let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].health > 0) {
            fill(0, 255, 0); //green for players
            ellipse(playersArr[i].x, playersArr[i].y, 20, 20);
        }
    }
    for(let i = 0; i < enemiesArr.length; i++) {
        if (enemiesArr[i].health > 0) {
            fill(255, 0, 0); //red for enemies
            ellipse(enemiesArr[i].x, enemiesArr[i].y, 20, 20);
        }
    }

    // Check for collisions and handle attacks
    for(let i = 0; i < playersArr.length; i++) {
        for(let j = 0; j < enemiesArr.length; j++) {
            if (dist(playersArr[i].x, playersArr[i].y, enemiesArr[j].x, enemiesArr[j].y) < 20) {
                playersArr[i].attack(enemiesArr[j]);
                if (enemiesArr[j].health === 0) {
                    enemiesArr.splice(j, 1); // Remove defeated enemy
                }
                if (playersArr[i].health === 0) {
                    playersArr.splice(i, 1); // Remove defeated player
                }
            }
        }
    }
}

function keyPressed() {
    // Prevent default browser behavior for arrow keys to stop scrolling
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        return false; // Prevents default in p5.js
    }
}
