<div align="center">
  <br />
    <a href="https://www.youtube.com/watch?v=7kA9lHdukGA&t=4530s" target="_blank">
      <img src="https://raw.githubusercontent.com/LOX-X/Tiktok-Live-Asteroids/main/views/img/background.png" alt="Project Banner">
    </a>
  <br />

  <h3 align="center">Tiktok Live Game</h3>

</div>

## <a name="introduction">🤖 Introduction</a>

I was inspired to start this project after watching a fascinating game on YouTube, developed by "Franks laboratory." The concept intrigued me, and I decided to take the idea one step further. By combining it with the TikTok-Live-Connector, I aimed to create a unique gaming experience where a ship shoots at players. In this game, people in the TikTok chat can interact with the game in real-time, influencing the gameplay and making it more engaging and dynamic.

Please note that the game is still a work in progress and requires additional development to reach its full potential.

In the future, I may fix some issues and add more features to enhance the gameplay experience.

A special thanks to "Franks laboratory" for his inspiring work.
<br /><br />
<a align="center" href="https://www.youtube.com/@Frankslaboratory" target="_blank"><img src="https://img.shields.io/badge/-Franks_laboratory-black?style=for-the-badge&logoColor=white&logo=youtube&color=ff0000" /></a>


## <a name="quick-start">Quick Start</a>

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

Reloading the page will not close the live connection!!

## <a name="info">More Info</a>

<details>
<summary><code>app.js</code></summary>

```typescript
// remove this when u done testing
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
```

</details>

#
