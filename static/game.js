GAME_INTERVAL = 50
FIELD = "FIELD"
PLAYER_ID = "1"
DIR = ""
STEP = 10
movement = {}
var c = new Image(100, 100)
c.src = "/static/tank.png?x76964"
document.body.appendChild(c);
c.style.position = "absolute"

players = [{
  id: PLAYER_ID,
  dir: "",
  e: c,
  x: 100,
  y: 10
}]

var socket = io.connect()
socket.on('game', function (tanks) {
	players.forEach(function(player, index, players) {
		let tank = tanks[player.id]
		if (tank) {
			let id = player.id
			if (tank === "_left")
				players[index].x += STEP
			if (tank === "_right")
				players[index].x -= STEP
			if (tank === "_top")
				players[index].y += STEP
			if (tank === "_down")
				players[index].y -= STEP
		}
	})
  update()
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
    socket.emit("game", {id: PLAYER_ID, dir: DIR});
}

function canMove() {
  var x = players[0].x;
  var y = players[0].y;

  switch (movement.dir) {
    case "":
      if (y + 100 + 10 > 1024 || map[x][y + 100 + 10] == 1 || map[x + 100][y + 100 + 10] == 1 || y + 10 >= 2024)
        return false;
      break;
    case "_left":
      if (map[x - 10][y] == 1 || map[x - 10][y + 100] == 1 || x - 10 <= 0 )
        return false;
      break;
    case "_up":
      if (map[x][y - 10] == 1 || map[x + 100][y - 10] == 1 || y - 10 <= 0)
        return false;
      break;
    case "_right":
      if (x + 100 + 10 > 1024 || map[x + 100 + 10][y] == 1 || map[x + 100 + 10][y + 100] == 1 || x + 10 >= 1024 )
        return false;
      break;

  }
  return true;
}

function update() {

  if(canMove()) {
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
  }
  
  DRAW()
}

setInterval(function () {
  sendState();
}, GAME_INTERVAL);

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
  }
});

movement.dir = ""