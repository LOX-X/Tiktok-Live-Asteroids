import { View } from "./view.js";
import { Players } from "./Players.js";
import { Ship } from "./ship.js";
import { Line } from "./line.js";
import { Player } from "./player.js";
import { Description } from "./description.js";
import { Explosion } from "./explosion.js";
import { pla } from "./tiktokevent.js";

export let winnerName; 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width= 540;
canvas.height= 960;
const projectiles = [];
export const players = [];
const explosionArray = [];
export const winner = new Player(canvas.width,canvas.height);
const description = new Description(canvas.width,canvas.height);
let explosion;

  //handleProjectiles from canvas
  function handleProjectiles(){
    try{
    for (let i = 0; i < projectiles.length; i++){
      projectiles[i].update();
      projectiles[i].draw(ctx);
      if (projectiles[i].x < 0 || projectiles[i].x > canvas.width ||
        projectiles[i].y < 0 || projectiles[i].y > canvas.height) {
          projectiles.splice(i, 1);
          i--;
        }
      }
    }catch(e){
      console.log(`handleProjectiles Error: ${e}`);
    }
    }
//handlePlayers from canvas
function removeplayer(){
  for (let i = 0; i < players.length; i++) {
    try{
    if(players[i]&&players[i].playerY+players[i].playerSize >= canvas.height){
      view.health -= players[i].health;
      winner.playerhealth-=players[i].health;
      if(view.health <= 0){
        const winnerImage = players[i].image;
        winnerName = players[i].name;
        winner.set({image: winnerImage, name: winnerName });
        view.set(true)
        view.health=100
        winner.playerhealth =100
        winner.bulletDamge =1
        winner.bullets=1
      }
        explosion = new Explosion(players[i].playerX,players[i].playerY,2);
        explosionArray.push(explosion);
        pla.splice(i,1);
        players.splice(i, 1);
        i--
    }
  }catch(e){
    console.log(`HandlePlayersCanvas Error: ${e}`)
  }
  }
}
//handlePlayers && projectiles
function handlePlayers(){
  for (let i = 0; i < players.length; i++) {
    players[i].update();
    players[i].draw(ctx);
    try{
      for (let j = 0; j < projectiles.length; j++) {
        const distance = Math.sqrt((projectiles[j].x - players[i].playerX)**2 + (projectiles[j].y - players[i].playerY)**2);
        if (distance < projectiles[j].radius + players[i].playerSize) {
          players[i].health -= winner.bulletDamge;//bulet damge
          if (players[i].health <= 0) {
            explosion = new Explosion(players[i].playerX,players[i].playerY,0);
            explosionArray.push(explosion);
            pla.splice(i,1);
            players.splice(i, 1);
          }
          projectiles.splice(j, 1);
          i--;
          break;
        }
      }
    }catch(e){
      console.error(`Players&&Projectiles Error: ${e}`)
    }
  }
}

function HandleExplosion(){
  for(let i = 0;i<explosionArray.length;i++){
    explosionArray[i].draw(ctx);
    explosionArray[i].update();
    if(explosionArray[i].framex>explosionArray[i].maxframe){
      explosionArray.splice(i,1)
    }
  }

}

// testing data
function runTest(){
  const img = './img/asteroid.png'
  const playerData = [
    { name: 'Player 1',img, health: 1,size:40 },
    { name: 'Player 2',img, health: 1,size:40 },
    { name: 'Player 2',img, health: 1,size:40 },
    { name: 'Player 2',img, health: 2,size:40 },
    { name: 'Player 5',img, health: 2000,size:50 },
  ];
  for (let i = 0; i < playerData.length; i++) {
    const data = playerData[i];
    let player = new Players(data.name, data.img, data.health, data.size);
    players.push(player)
  }
} 

runTest()

let fps = 250; //FPS 
let interval = 1000 / fps;
let lastTime = 0;
const line = new Line()
const view = new View(canvas.width, canvas.height);
const ship = new Ship(view,players,projectiles,winner);

function animate(timestamp){
  
  if (timestamp - lastTime >= interval) {
    lastTime = timestamp;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handlePlayers();
    handleProjectiles();
    HandleExplosion();
    winner.hpcheck();
    line.draw(ctx);
    view.draw(ctx);
    removeplayer();
    winner.draw(ctx);
    description.draw(ctx);
    view.update();
    ship.draw(ctx);
    ship.update();
  }
  requestAnimationFrame(animate)
}

animate()

