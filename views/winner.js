export class Winner {
  constructor(width, height) {
    this.check = null;
    this.width = width;
    this.height = height;
    this.imageWidth = 130;
    this.imageHeight = 130;
    this.bulletDamge = 1;
    this.bullets = 1;
    this.max = "";
    this.playerhealth = 1000;
    this.imagebullet = new Image();
    this.imagebullet.src = "img/bullet.png";
    this.imagedamge = new Image();
    this.imagedamge.src = "img/ice-cream.png";
    this.imagehp = new Image();
    this.imagehp.src = "img/hp.png";
  }
  draw(context) {
    if (this.check) {
      const centerX = this.width / 2;
      const bottomY = this.height - 25;
      const radius = this.imageWidth / 2;
      const originalLineWidth = context.lineWidth;

      context.save();
      context.beginPath();
      context.arc(this.width / 2, bottomY - radius, radius, 0, 2 * Math.PI);
      context.closePath();
      context.clip();
      context.drawImage(
        this.check.image,
        centerX - radius,
        bottomY - this.imageHeight,
        this.imageWidth,
        this.imageHeight
      );
      context.restore();

      context.lineWidth = 8;
      context.beginPath();
      context.strokeStyle = "black";
      context.fillStyle = "gold";
      context.font = "bold 30px Helvetica";
      context.textAlign = "center";
      context.strokeText(this.check.name, centerX, bottomY - 15);
      context.fillText(this.check.name, centerX, bottomY - 20);
      context.font = "bold 20px Helvetica";
      context.lineWidth = 5; // set new line width for "Damage: 10"

      context.drawImage(
        this.imagedamge,
        this.height / 2 - 100,
        this.height - 200,
        45,
        45
      );
      context.drawImage(
        this.imagebullet,
        this.height / 2 - 100,
        this.height - 265,
        45,
        45
      );
      context.drawImage(
        this.imagehp,
        this.height / 2 - 100,
        this.height - 135,
        45,
        45
      );
      context.lineWidth = 4;
      context.fillStyle = "black";
      context.strokeStyle = "gold";
      context.strokeText(`x1`, this.height / 2 - 75, this.height - 220); //hp
      context.fillText(`x1`, this.height / 2 - 75, this.height - 220); //hp
      context.strokeText(`x1`, this.height / 2 - 75, this.height - 150); //damage
      context.fillText(`x1`, this.height / 2 - 75, this.height - 150); //damage
      context.strokeText(`x1`, this.height / 2 - 75, this.height - 90); //health
      context.fillText(`x1`, this.height / 2 - 75, this.height - 90); //health

      context.font = "bold 22px Helvetica";
      context.lineWidth = 8;
      context.strokeStyle = "black";
      context.fillStyle = "gold";

      context.strokeText(
        `🚀 : ${this.bullets} ${this.max}`,
        this.height / 2,
        this.height - 235
      );
      context.fillText(
        `🚀 : ${this.bullets} ${this.max}`,
        this.height / 2,
        this.height - 235
      );

      context.strokeText(
        `Dm: ${this.bulletDamge}`,
        this.height / 2,
        this.height - 165
      );
      context.fillText(
        `Dm: ${this.bulletDamge}`,
        this.height / 2,
        this.height - 165
      );

      context.strokeText(
        `HP: ${this.playerhealth}`,
        this.height / 2,
        this.height - 105
      );
      context.fillText(
        `HP: ${this.playerhealth}`,
        this.height / 2,
        this.height - 105
      );

      context.lineWidth = originalLineWidth; // reset line width
    }
  }
  set(player) {
    this.check = player;
  }
  hpcheck() {
    if (this.bullets === 5) {
      this.max = "max";
    } else {
      this.max = "";
    }
  }
}
