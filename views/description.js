export class Description{
  constructor(width,height){
      this.width=width
      this.height=height
      this.rose = new Image()
      this.rose.src= 'img/rose.png'
      this.like = new Image()
      this.like.src = "img/like.png"
      this.share = new Image()
      this.share.src = "img/share.png"
      this.follow = new Image()
      this.follow.src = "img/follow.png"
      
  }
  draw(context){
        const originalLineWidth = context.lineWidth;
        context.beginPath();
        context.lineWidth = 8;
        context.beginPath();
        context.strokeStyle = 'black';
        context.fillStyle = 'gold';
        context.font = 'bold 22px Helvetica';
        context.textAlign = 'center';
      
        context.drawImage(this.rose, this.width - 530, this.height - 265, 45, 45);
        context.strokeText('+10', this.width - 450, this.height - 235);
        context.fillText('+10', this.width - 450, this.height - 235);

        context.drawImage(this.like, this.width - 530, this.height - 210, 45, 45);
        context.strokeText('+2', this.width - 450, this.height - 180);
        context.fillText('+2', this.width - 450, this.height - 180);

        context.drawImage(this.share, this.width - 530, this.height - 160, 45, 45);
        context.strokeText('+3', this.width - 450, this.height - 130);
        context.fillText('+3', this.width - 450, this.height - 130);

        context.drawImage(this.follow, this.width - 530, this.height - 110, 45, 45);
        context.strokeText('+5', this.width - 450, this.height - 80);
        context.fillText('+5', this.width - 450, this.height - 80);

        context.lineWidth = originalLineWidth; // reset line width
      
    }
  
}