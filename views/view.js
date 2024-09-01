export class View {
  constructor(width, height) {
    this.check = false;
    this.health = 1000;
    this.width = width;
    this.height = height;
    this.earthWidth = 130;
    this.earthHeigt = 130;
    this.x = this.width / 2;
    this.y = this.height - 100;
    this.angle = 0;
    this.image = new Image();
    this.image.src = "img/earth.png";
    this.hp = 164;
    this.max = 280;
    this.damge = 400;
  }
  draw(context) {
    if (!this.check) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(
        this.image,
        0 - this.earthWidth * 0.5,
        0 - this.earthHeigt * 0.5,
        this.earthWidth,
        this.earthHeigt
      );
      context.restore();
      context.beginPath();
    }

    context.beginPath();
    context.strokeStyle = "black";
    context.fillStyle = "gold";
    context.font = "bold 20px Helvetica";
    context.textAlign = "center";
    context.lineWidth = 8;
    context.strokeText(`HP: ${this.health}`, this.x, this.height - 50);
    context.fillText(`HP: ${this.health}`, this.x, this.height - 50);
  }
  update() {
    this.angle += 0.003;
  }
  set(check) {
    this.check = check;
  }
}
