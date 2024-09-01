const connectButton = document.getElementById('btn');
const status = document.getElementById('output');
const username = document.getElementById("username");

import { players } from "./app.js";
import { Players } from "./Players.js";
import { winnerName } from "./app.js";
import { winner } from "./app.js";

let config;
export function main(){
    startWebSocket()
    connectButton.addEventListener("click", onConnectEvent);
}

function startWebSocket(){
    let ws = new WebSocket('ws://' + location.hostname + ':8080');

    ws.onopen = function(e){
        let req = new XMLHttpRequest();
        req.open("POST", 'status', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({}));
    }

    ws.onclose = function(e){
        ws = null
        setTimeout(startWebSocket, 3000);
    }

    ws.onmessage = function (e) {
        e = JSON.parse(e.data)
        if (e.type == undefined){
            config = e;
        }else{  
            onTikTokEvent(e);  
        }
    }
}

function onConnectEvent(){
    let user = username.value;
    if(user.startsWith('@')){
        user = user.split('@')[1];
    }
    username.value = '';
    var req = new XMLHttpRequest();
    req.open("POST", 'start', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({"username": user}));

    status.innerText = 'Connecting (@' + user + ')';
}
export const pla = [];
function onTikTokEvent(e){
    let type = e.type;
    let ev = e.data;
 
    if (type == 'status'){
        status.innerText = e.data;
    }else if (type == 'connected'){

        status.innerText = 'Connected';
        
    }else if (type == 'disconnected'){
        status.innerText = 'Disconnected';
    }else if (type == 'gift'){    
        if (ev.giftType === 1 && ev.repeatEnd){
            let img = new Image();
            img.src = ev.userDetails.profilePictureUrls[0];
            img.onload = function loded(){
                let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],ev.repeatCount*ev.diamondCount*10,40);
                players.push(player);
            }
        }else if(ev.giftType !== 1){
            let img = new Image();
            img.src = ev.userDetails.profilePictureUrls[0];
            img.onload = function loded(){
                let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],ev.diamondCount*10,40);
                players.push(player);
            }
        }
        console.log(ev.giftId)
        if(typeof winnerName !== 'undefined'){
            if(winnerName == ev.uniqueId){
                if(ev.giftId===5655){//bullets
                    if(winner.bullets<5){
                        winner.bullets+=1;
                    }else{
                        winner.playerhealth+=1;
                    }
                }else if(ev.giftId===5269){//damage
                    winner.bulletDamge+=1;
                }else if(ev.giftId===5827){//hp
                    winner.playerhealth+=1;
                }
            }
        }
     
    }else if(type == 'chat'){
        //console.log(ev.comment);// show comments (not recommended)
        //u can use this for testing, inter a number in the chat it will create a player
        if(Number.isInteger(parseInt((ev.comment))))
        {
            let img = new Image();
            img.src = ev.userDetails.profilePictureUrls[0];
            img.onload = function loded(){
                let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],ev.comment,40);
                players.push(player);
            }
        }
    }else if(type == 'like'){
        if(!pla.includes(ev.uniqueId)){
            pla.push(ev.uniqueId);
            let img = new Image()
            img.src = ev.userDetails.profilePictureUrls[0]
            img.onload = function loded(){
                let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],2,40)
                players.push(player)
        
            }
        }
    }else if(type == 'share'){
        let img = new Image()
        img.src = ev.userDetails.profilePictureUrls[0]
        img.onload = function loded(){
            let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],3,40)
            players.push(player)
        }
    }else if(type == 'follow'){
        let player= new Players(ev.uniqueId,ev.userDetails.profilePictureUrls[0],5,40)
        players.push(player)
    }
} 

main()