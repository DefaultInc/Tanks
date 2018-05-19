GAME_INTERVAL = 50;
tankStep = 10;

var playerIds = 0
bullets = []
players = []


function newBullet(player, direct, x, y) {
  let b = new Image(25, 30);
  b.src = "/static/bullet.png?x76964"
  b.style.position = "absolute"
  b.style.left = x + 'px';
  b.style.top = y + 'px';

  return {
    dir: direct,
    own: player,
    b: b,
    x: x,
    y: y
  };

}


function getNewPlayer(x, y, name) {
  let c = new Image(100, 100)
  c.src = "/static/tank.png?x76964"
  document.body.appendChild(c);
  c.style.position = "absolute"

  return {
    id: playerIds++,
    name: name,
    dir: "",
    e: c,
    x: x,
    y: y
  }
}

function DRAW() {
  players.forEach(player => {
    player.e.style.left = player.x + 'px';
    player.e.style.top = player.y + 'px';
    if (player.dir != undefined) {
      player.e.src = 'static/tank' + player.dir + '.png';
    }
  })
}

function canMove(element) {
  var x = element.x;
  var y = element.y;

  switch (element.dir) {
    case "":
      if (y + 100 + 10 > 1024 || map[x][y + 100 + 10] == 1 || map[x + 100][y + 100 + 10] == 1 || y + 10 >= 2024)
        return false;
      break;
    case "_left":
      if (map[x - 10][y] == 1 || map[x - 10][y + 100] == 1 || x - 10 <= 0)
        return false;
      break;
    case "_up":
      if (map[x][y - 10] == 1 || map[x + 100][y - 10] == 1 || y - 10 <= 0)
        return false;
      break;
    case "_right":
      if (x + 100 + 10 > 1024 || map[x + 100 + 10][y] == 1 || map[x + 100 + 10][y + 100] == 1 || x + 10 >= 1024)
        return false;
      break;

  }
  return true;
}

function update() {
  
  players.forEach(element => {
    if (canMove(element)) {
      switch (element.dir) {
        case "_left": // A
          element.x -= 10
          break;
        case "_up": // W
          element.y -= 10
          break;
        case "_right": // D
          element.x += 10
          break;
        case "": // S
          element.y += 10
          break;
      }
    }
  });
  DRAW()
}

function shoot(player) {
  let newb = newBullet(player.id, player.dir, player.x + 50 - 12, player.y + 50 - 15);
  bullets.push(newb)
  document.body.appendChild(newb.b);

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

    if (bullet.x < 0 || bullet.y < 0 || bullet.x > 1024 || bullet.y > 1024 || map[bullet.x][bullet.y] == 1) {
      document.body.removeChild(bullet.b);
      to_remove.push(bullet)
    } else {
      players.forEach(element => {
        if (bullet.own != element.id && intersect(element, bullet.x, bullet.y)) {
          killPlayer(element);
        }
      });
    }

  });

  function killPlayer(element){
    
    alert("WINNER: " + element.name)
    location.reload();
    var index = players.indexOf(element);
    if (index > -1) {
      players.splice(index, 1);
    }
    document.body.removeChild(element.e);
  }


  function intersect(player, x, y) {
    if (player.x <= x && x <= player.x + 100 &&
      player.y <= y && y <= player.y + 100)
      return true;
  }

  to_remove.forEach(ele => {
    var index = bullets.indexOf(ele);
    if (index > -1) {
      bullets.splice(index, 1);
    }
  });

}

setInterval(function () {
  move_bot();
}, 1000);
  


setInterval(function () {
  update();
}, GAME_INTERVAL);

// update bullets
setInterval(function () {
  updateBullets()
}, GAME_INTERVAL / 4);

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 65: // A
      players[0].dir = "_left";
      break;
    case 87: // W
      players[0].dir = "_up";
      break;
    case 68: // D
      players[0].dir = "_right";
      break;
    case 83: // S
      players[0].dir = "";
      break;
    case 37: // A
      players[1].dir = "_left";
      break;
    case 38: // W
      players[1].dir = "_up";
      break;
    case 39: // D
      players[1].dir = "_right";
      break;
    case 40: // S
      players[1].dir = "";
      break;
    case 32: // Spacebar
      shoot(players[0]);
      break;
    case 13:
      shoot(players[1]);
      break
  }
});



players.push(getNewPlayer(10,10, 'BOT'))

players.push(getNewPlayer(500,10, 'USER'))

var bot_dirs = ["_left", "_right", "_up", ""]
var steps = 0;

function can_see() {
  if (Math.abs(players[0].x - players[1].x) < 200 || Math.abs(players[0].y - players[1].y) < 200) return true;
  return false;
}

function move_bot() {
  if (can_see()) {
    if (players[0].dir == '_left')
      players[1].dir = '_right';
    if (players[0].dir == '_right')
      players[1].dir = '_left';
    if (players[0].dir == '_top')
      players[1].dir = '_bot';
    if (players[0].dir == '_bot')
      players[1].dir = '_left';
  }
  if (!canMove(players[1])) {
    steps++;
    players[1].dir = bot_dirs[Math.round(steps) % 4];

  }
  shoot(players[1]);  
}
