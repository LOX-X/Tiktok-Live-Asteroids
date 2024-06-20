import { Projectile } from "./projectile.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
export class Ship {
    constructor(view,players,projectiles) {
        this.shipWidth = 80;
        this.shipHeight = 80;
        this.targetAngle = -1.5;
        this.easing = t => t; //default to linear easing
        this.view = view;
        this.players=players;
        this.projectiles = projectiles;
        this.angle=-1.5;
        this.bullets=1; //bullet count
        this.bulletSpeed =2; //bullet speed
        this.image = new Image();
        this.image.src = 'img/spaceship.png';
        this.bulletDistance = 300;//Distance btween each bullet
        this.shotsRemaining = 1;// keep track of remaining shots
        this.shotTimer = 0; //timer for delaying shots
        this.shotDelay = 250; //delay between each bullets cycle
    }
    draw(context) {
        context.save();
        context.translate(this.view.x, this.view.y);
        context.rotate(this.angle);
        context.translate(110, 0);//Distance between ship&&earth
        context.fillStyle = "orange";
        context.beginPath();
        context.rotate(Math.PI / 2);
        context.drawImage(this.image, -this.shipWidth / 2, -this.shipHeight / 2, this.shipWidth, this.shipHeight);
        context.closePath();
        context.fill();
        context.restore();
    }
    update() {
        const diff = this.targetAngle - this.angle;
        const step = diff * this.easing(0.09);
        const playerYValues = this.players.map(player => player.playerY);
        let res = playerYValues.filter(va=>va<690)
        const maxPlayerY = Math.max(...res);
        const maxPlayer = this.players.find(player => player.playerY === maxPlayerY);
    
        if (maxPlayer) {
          const { playerX } = maxPlayer;
          let dx = playerX - this.view.x;
          let dy = maxPlayerY - this.view.y;
          this.targetAngle = Math.atan2(dy, dx);
          const angle = this.targetAngle;
          const velocityX = Math.cos(angle) * this.bulletSpeed;
          const velocityY = Math.sin(angle) * this.bulletSpeed;
          const x = maxPlayer.playerX;
          const y = maxPlayer.playerY;
          const halfSize = maxPlayer.playerSize / 2;
          if (x - halfSize >= 0 && x + halfSize <= canvas.width &&
              y - halfSize >= 0 && y + halfSize <= 800) {
                  if (this.shotTimer <= 0 && this.shotsRemaining > 0) {
                    for (let i = 0; i < this.bullets; i++) {
                      setTimeout(() => {
                        const bullet = new Projectile(this.view.x, this.view.y, velocityX, velocityY, 5, 'blue', angle);
                        this.projectiles.push(bullet);
                      }, i * this.bulletDistance);
                    }
                    this.shotsRemaining--;
                    if (this.shotsRemaining === 0) {
                      this.shotTimer = this.shotDelay;
                      this.shotsRemaining = 1;
                    } else {
                      this.shotTimer = 1000;
                    }
                  }
                  this.angle += step;
                  this.shotTimer--;  
          }
        }
        this.angle += step;
        this.draw(ctx);
      }
    }
