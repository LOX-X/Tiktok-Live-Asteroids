const fs = require('fs')
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const results = Object.create(null);
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: '8080' })
const express = require('express')
const bodyParser = require('body-parser');
const { WebcastPushConnection } = require('tiktok-live-connector');
const app = express()

let config = fs.readFileSync('config.json')
config = JSON.parse(config);
const events = ['connected', 'disconnected', 'gift', 'like','share','follow','chat']
const connections = []
let tiktokConnection = null
let tiktokUsername = null
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})


app.post('/start', (req, res) => {
    tiktokUsername = req.body.username.toString()
    start()
})

app.post('/status', (req, res) => {
    let status = 'Disconnected'
    
    try {
        if (tiktokConnection != null){
            if (tiktokConnection.getState().isConnecting){
                status = 'Connecting (@' + tiktokUsername + ')'
            }else if (tiktokConnection.getState().isConnected){
                status = 'Connected (@' + tiktokUsername + ')'
            }
        }
    } catch (error) {
        
    }
    connections.forEach(connection =>{
        connection.send(JSON.stringify({
            type: 'status',
          
            data: status,
        }))
    })
})


app.listen(port)

server.on('connection', socket => {
    connections.push(socket)
    //socket.send(JSON.stringify(g))
    socket.send(JSON.stringify(config))
})

async function start(){
    if (tiktokConnection != null){
        try {
            await tiktokConnection.disconnect()
        } catch (error) {
            console.log(error);
        }
    }

    tiktokConnection = new WebcastPushConnection(tiktokUsername, {
        processInitialData: false
    }
    );
  

    tiktokConnection.getAvailableGifts().then(giftList => {
        if (giftList.length === 0) {
            // If there are no gifts available, create an empty configuration
            const config = {
                gifts: []
            };
    
            const jsonData = JSON.stringify(config, null, 2);
    
            fs.writeFile('config.json', jsonData, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Empty configuration created successfully!');
            });
        } else {
            const config = {
                gifts: giftList.map(gift => ({
                    name: gift.name,
                    id: gift.id,
                    cost: gift.diamond_count
                }))
            };
    
            const jsonData = JSON.stringify(config, null, 2);
    
            fs.writeFile('config.json', jsonData, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Data saved successfully!');
            });
        }
    });


    tiktokConnection.connect().catch(err => {
        console.error('Failed to connect', err);
    })

    events.forEach(eventName => {
        tiktokConnection.on(eventName, data => {
            connections.forEach(connection => {
                connection.send(JSON.stringify({
                    type: eventName,
                    data: data
                }))
            })
        })
    })

}




function getIP(){
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                return net.address
            }
        }
    }
}

console.log('')
console.log('Starting... Please wait')
console.log('')
console.log('Localhost URL (PC): http://localhost:' + port)
console.log('Remote URL (Mobile): http://' + getIP() + ':' + port)
