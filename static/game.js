GAME_INTERVAL = 50
FIELD = "FIELD"
PLAYER_ID = "1"
STEP = 10
movement = {}
var c = new Image(100, 100)
c.src = "/static/tank.png?x76964"
document.body.appendChild(c);
c.style.position = "absolute"



function newBullet(direct, x, y) {
  let b = new Image(25, 30);
  b.src = "/static/bullet.png?x76964"
  b.style.position = "absolute"
  b.style.left = x + 'px';
  b.style.top = y + 'px';

  return {
    dir: direct,
    b: b,
    x: x,
    y: y
  };

}

players = [{
  id: PLAYER_ID,
  dir: "down",
  e: c,
  x: 100,
  y: 10
}]

bullets = []

var socket = io();
socket.on('game', function (data) {
  console.log("asd")
  players.forEach(function (player, index, players) {
    if (player.id in data) {
      let id = player.id
      console.log(data, player)
      if (data[id] != player.dir) {
        player.dir = data[id]
      } else {
        if (data[id] == "left")
          player.x += STEP
        if (data[id] == "right")
          player.x -= STEP
        if (data[id] == "top")
          player.y += STEP
        if (data[id] == "down")
          player.y -= STEP

      }
    }
  })
});

function DRAW() {
  players.forEach(player => {
    player.e.style.left = player.x + 'px';
    player.e.style.top = player.y + 'px';
    if (movement.dir != undefined) {
      player.e.src = 'static/tank' + movement.dir + '.png';
    }
  })
}

function sendState() {
  socket.emit('game', {
    PLAYER_ID: movement
  })
}

function update() {

  switch (movement.dir) {
    case "_left": // A
      players[0].x -= 10
      break;
    case "_up": // W
      players[0].y -= 10
      break;
    case "_right": // D
      players[0].x += 10
      break;
    case "": // S
      players[0].y += 10
      break;
  }

  DRAW()
}


function shoot(x, y) {
  let newb = newBullet(movement.dir, x, y);
  bullets.push(newb)
  document.body.appendChild(newb.b);

  // var x, y;
  // document.body.appendChild(b);
  // players.forEach(player => {
  //   console.log(player);
  //   x = player.x;
  //   y = player.y;
  // });
  // bullets.forEach(bullet => {
  //   bullet.s.style.left = x + 15 + 'px';
  //   bullet.s.style.top = y + 'px';
  // });
}

function updateBullets() {
  to_remove = []
  bullets.forEach(bullet => {

    switch (bullet.dir) {
      case "_left": // A  
        bullet.x = bullet.x - 10;
        break;
      case "_up": // W
        bullet.y = bullet.y - 10;
        break;
      case "_right": // D
        bullet.x = bullet.x + 10;
        break;
      case "": // S
        bullet.y = bullet.y + 10;
        break;
    }
    bullet.b.style.left = bullet.x + 'px'
    bullet.b.style.top = bullet.y + 'px';

    if (bullet.x < 0 || bullet.y < 0 || bullet.x > 1024 || bullet.y > 1024) {
      document.body.removeChild(bullet.b);
      to_remove.push(bullet)
    }
  });

  to_remove.forEach(ele => {
    var index = bullets.indexOf(ele);
    if (index > -1) {
      bullets.splice(index, 1);
    }
  });

}


setInterval(function () {
  update();
  sendState();
}, GAME_INTERVAL);

// update bullets
setInterval(function () {
  updateBullets()
}, GAME_INTERVAL / 2);



document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.dir = "_left";
      break;
    case 87: // W
      movement.dir = "_up";
      break;
    case 68: // D
      movement.dir = "_right";
      break;
    case 83: // S
      movement.dir = "";
      break;
    case 32: // Spacebar
      shoot(players[0].x, players[0].y);
      break;
  }
});

movement.dir = ""