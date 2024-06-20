export class Players {
    constructor(name,image,health,size) {
      this.playerX = Math.floor(Math.random() * (canvas.width - size)) + size;
      this.playerY = -100
      this.health=health;
      this.speed = 0.4; //players speed
      this.playerSize = size;
      this.image = new Image();
      this.image.src= image;
      this.playerWidth =this.playerSize * 2;
      this.playerHeight = this.playerSize * 2;
      this.name = name; //players name
    }
    draw(ctx) {
      const radius = this.playerSize;
      const x = this.playerX - this.playerWidth * 0.5;
      const y = this.playerY - this.playerHeight * 0.5;
      const originalLineWidth = ctx.lineWidth;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(this.image, x, y, this.playerWidth, this.playerHeight);
      ctx.restore();
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'gold';
      ctx.font = 'bold 20px Helvetica';
      ctx.textAlign = 'center';
      ctx.strokeText(this.health, this.playerX, this.playerY + 30);
      ctx.fillText(this.health, this.playerX, this.playerY + 30);
      ctx.lineWidth = originalLineWidth;
    }
    update() {
      this.playerY += this.speed;
    }
  }