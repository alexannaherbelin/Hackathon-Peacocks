
let playersArr = [];
let enemiesArr = [];
let hitboxSize = 20; // Size of the hitbox for collision detection
let jumpingInterval;

let enemiesnum = 2; // Number of enemies to create

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Initialize players and enemies
    playersArr.push(new Player("Albinson", 100, 100, 100, 20, 20, false, false));
    for(let i = 0; i < enemiesnum; i++) {
        let type = random() < 0.5 ? "Orc" : "Goblin";
        enemiesArr.push(new Enemy(type, random(50, windowWidth-50), random(50, windowHeight-50), 80, 15));
    }

}



class Player {
    constructor(name, x, y, health, power, hitboxSize, ducking, jumping) {
        this.name = name;
        this.score = 0;
        this.x = x;
        this.y = y;
        this.health = health;
        this.power = power;
        this.hitboxSize = hitboxSize;
        this.ducking = false;
        this.jumping = false;

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

    duck() {
        console.log(this.name + " ducks to avoid an attack!");
        this.hitboxSize = 10; // Reduce hitbox size when ducking
        this.ducking = true; // Set ducking state
       
    }

    jump() {
        if(this.jumping === false) {
            console.log(this.name + " jumps to avoid an attack!");
            this.move(0, -20); 
            this.ducking = false; 
            this.jumping = true;
            jumpingInterval = setInterval(this.stopjump.bind(this), 500);
        }
    }
    
    stopjump() {
        this.move(0, 20); 
        this.jumping = false;
        clearInterval(jumpingInterval);
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

    // Handle player movement with arrow keys (continuous) - only if player exists
    if (playersArr.length > 0) {
        if (keyIsDown(LEFT_ARROW) && playersArr[0].x > 10) { 
            playersArr[0].move(-5, 0);
        }
        if (keyIsDown(RIGHT_ARROW) && playersArr[0].x < windowWidth - 10) {
            playersArr[0].move(5, 0);
        }
        if (keyIsDown(UP_ARROW) && playersArr[0].y > 10) {
            playersArr[0].jump();
        }
        if (keyIsDown(DOWN_ARROW) && playersArr[0].y < windowHeight - 10) {
            playersArr[0].duck();
        }
    }

    //Drawing the players and enemys as circles
    for(let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].health > 0) {
            fill(0, 255, 0); //green for players
            ellipse(playersArr[i].x, playersArr[i].y, playersArr[i].hitboxSize, playersArr[i].hitboxSize);
        }
    }
    for(let i = 0; i < enemiesArr.length; i++) {
        if (enemiesArr[i].health > 0) {
            fill(255, 0, 0); //red for enemies
            ellipse(enemiesArr[i].x, enemiesArr[i].y, 20, 20);
        }
    }

    // Check for collisions and handle attacks (loop backwards to safely remove elements)
    /*for(let i = playersArr.length - 1; i >= 0; i--) {
        for(let j = enemiesArr.length - 1; j >= 0; j--) {
            if (dist(playersArr[i].x, playersArr[i].y, enemiesArr[j].x, enemiesArr[j].y) < 20) {
                playersArr[i].attack(enemiesArr[j]);
                enemiesArr[j].attack(playersArr[i]);
                if (enemiesArr[j].health === 0) {
                    enemiesArr.splice(j, 1);
                }
                if (playersArr[i].health === 0) {
                    playersArr.splice(i, 1);
                    if(playersArr.length === 0) {
                        break; // Break inner loop since player is removed
                    }
                }
            }
        }
    }*/
    console.log(playersArr[0].ducking);
}

function keyPressed() {
    // Prevent default browser behavior for arrow keys to stop scrolling
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        return false; // Prevents default in p5.js
    }
}
function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        playersArr[0].ducking = false;
        playersArr[0].hitboxSize = 20; // Reset hitbox size when not ducking
    }
}