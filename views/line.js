export class Line{
    constructor(){
      this.x =650
    }
    draw(context){
      context.strokeStyle = "black";
      context.beginPath();
      context.lineWidth = 5;
      context.moveTo(0, this.x);
      context.lineTo(canvas.width, this.x);
      context.stroke();
    }
  }