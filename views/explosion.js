export class Explosion{
    constructor(x,y,pos){
        this.x=x;
        this.y=y;
        this.speed=1.5;
        this.image = new Image();
        this.image.src = "img/explosions.png";
        this.spriteWidth1= 150;
        this.spriteHeight1= 150;
        this.width =300;
        this.height =300;
        this.framex=0;
        this.freamey=pos*2;
        this.maxframe=22;
        this.animationTimer = 0;
        this.animationInterval = 1000/2
        this.check = false
    }
    draw(ctx){
        ctx.drawImage(this.image,this.width*this.framex,this.spriteHeight1*this.freamey,this.width,this.height,this.x-this.spriteWidth1*0.5,this.y-this.spriteHeight1*0.5,this.spriteWidth1,this.spriteHeight1);
    }
    update(){
     if(this.animationTimer>this.animationInterval){
        this.framex++;
        this.y += this.speed;
        this.animationTimer=0
     }else{
        this.animationTimer+=100;
     }
    }
}