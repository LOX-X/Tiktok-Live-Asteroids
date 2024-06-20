export class Projectile {
  constructor(x, y, velocityX, velocityY, radius, color,angle) {
    this.x = x + Math.cos(angle) * 170; 
    this.y = y + Math.sin(angle) * 170;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.radius = radius;
    this.color = 'red';
    this.angle = angle+0.8;
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw(ctx) {
    ctx.save(); 
    ctx.font = 'bold 30px Helvetica';
    ctx.translate(this.x, this.y); 
    ctx.rotate(this.angle);
    ctx.fillText("🚀", 5, 5);
    ctx.restore();
  }
}

  
  