let playersArr = [];
let enemiesArr = [];
const GRAVITY = 1;
const FLOOR_Y_OFFSET = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playersArr.push(new Player('Player1', 100, height - FLOOR_Y_OFFSET));
  enemiesArr.push(new Enemy('Enemy1', width - 120, height - FLOOR_Y_OFFSET, 100, 10));
  enemiesArr.push(new Enemy('Enemy2', width - 350, height - FLOOR_Y_OFFSET, 100, 15));
}

class Player {
  constructor(name, x, y) {
    this.name = name;
    this.score = 0;
    this.health = 120;
    this.maxHealth = 120;
    this.power = 20;
    this.x = x;
    this.y = y;
    this.baseSize = 40;
    this.hitboxSize = this.baseSize;
    this.velocityY = 0;
    this.speed = 6;
    this.jumping = false;
    this.ducking = false;
    this.isAlive = true;
  }

  update() {
    if (!this.isAlive) return;

    if (this.y < height - FLOOR_Y_OFFSET) {
      this.velocityY += GRAVITY;
      this.y += this.velocityY;
      this.jumping = true;
    } else {
      this.y = height - FLOOR_Y_OFFSET;
      this.velocityY = 0;
      this.jumping = false;
    }

    this.x = constrain(this.x, 20, width - 20);

    if (this.ducking) {
      this.hitboxSize = this.baseSize * 0.5;
    } else {
      this.hitboxSize = this.baseSize;
    }
  }

  move(dx) {
    this.x += dx * this.speed;
  }

  jump() {
    if (!this.jumping && this.isAlive) {
      this.velocityY = -18;
      this.jumping = true;
      this.ducking = false;
    }
  }

  duck(state) {
    if (!this.isAlive) return;
    this.ducking = state;
  }

  attack(enemy) {
    if (!this.isAlive || !enemy.isAlive) return;
    if (this.isColliding(enemy)) {
      enemy.takeDamage(this.power, this);
    }
  }

  takeDamage(amount) {
    if (!this.isAlive) return;
    this.health = max(0, this.health - amount);

    if (this.health <= 0) {
      this.isAlive = false;
      console.log(`${this.name} defeated after score ${this.score}`);
    }
  }

  addScore(points) {
    if (!this.isAlive) return;
    this.score += points;
  }

  getHitboxRadius() {
    return this.hitboxSize / 2;
  }

  isColliding(other) {
    const distance = dist(this.x, this.y, other.x, other.y);
    return distance < this.getHitboxRadius() + other.getHitboxRadius();
  }
}

class Enemy {
  constructor(name, x, y, health, damage) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.health = health;
    this.damage = damage;
    this.speed = 2.2;
    this.direction = random([-1, 1]);
    this.baseSize = 40;
    this.isAlive = true;
  }

  update() {
    if (!this.isAlive) return;
    this.x += this.speed * this.direction;
    if (this.x < 20 || this.x > width - 20) this.direction *= -1;
  }

  takeDamage(amount, player) {
    if (!this.isAlive) return;
    this.health = max(0, this.health - amount);
    if (this.health <= 0) {
      this.isAlive = false;
      player.addScore(10);
      console.log(`${this.name} defeated; ${player.name} +10 score`);
    }
  }

  getHitboxRadius() {
    return this.baseSize / 2;
  }
}

function draw() {
  background(30, 45, 80);
  fill(120, 200, 130);
  rect(0, height - FLOOR_Y_OFFSET + 20, width, FLOOR_Y_OFFSET - 20);

  const player = playersArr[0];
  if (player) {
    player.update();
    fill(player.isAlive ? 'lightblue' : 'grey');
    ellipse(player.x, player.y, player.hitboxSize);

    stroke(255, 40, 40);
    noFill();
    rect(20, 20, 200, 18);
    noStroke();
    fill(255, 50, 50);
    const healthW = map(player.health, 0, player.maxHealth, 0, 200);
    rect(20, 20, healthW, 18);

    fill(255);
    textSize(16);
    text(`Health: ${player.health}/${player.maxHealth}`, 240, 34);
    text(`Score: ${player.score}`, 20, 55);
  }

  enemiesArr.forEach((enemy) => {
    enemy.update();
    if (!enemy.isAlive) {
      fill(100);
      ellipse(enemy.x, enemy.y, enemy.baseSize);
      return;
    }
    fill(200, 40, 40);
    ellipse(enemy.x, enemy.y, enemy.baseSize);
    if (player && player.isColliding(enemy)) {
      player.takeDamage(enemy.damage);
    }
  });

  if (player && player.isAlive && keyIsDown(32)) {
    enemiesArr.forEach((enemy) => player.attack(enemy));
  }

  if (player && !player.isAlive) {
    textSize(40);
    fill(255, 220, 0);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    playersArr[0]?.jump();
  }
  if (keyCode === DOWN_ARROW) {
    playersArr[0]?.duck(true);
  }

  if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, 32].includes(keyCode)) {
    return false;
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    playersArr[0]?.duck(false);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
