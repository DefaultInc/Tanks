GAME_INTERVAL = 500
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
  dir: "down",
  e: c,
  x: 100,
  y: 10
}]

var socket = io.connect()
socket.on('game', function (tanks) {
	console.log(tanks)
	players.forEach(function(player, index, players) {
		let tank = tanks[player.id]
		console.log(tank)
		if (tank) {
			let id = player.id
			if (tank === "left")
				players[index].x += STEP
			if (tank === "right")
				players[index].x -= STEP
			if (tank === "top")
				players[index].y += STEP
			if (tank === "down")
				players[index].y -= STEP
		}
	})
});

function DRAW() {
  players.forEach(player => {
    player.e.style.left = player.x + 'px';
    player.e.style.top = player.y + 'px';
  })
}

function sendState() {
    socket.emit("game", {id: PLAYER_ID, dir: DIR});
}

function update() {
  DRAW()
}

setInterval(function () {
  update();
  sendState();
}, GAME_INTERVAL);

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.dir = "left";
      DIR = "left"
      break;
    case 87: // W
      movement.dir = "top";
      DIR = "top"
      break;
    case 68: // D
      movement.dir = "right";
      DIR = "right"
      break;
    case 83: // S
      movement.dir = "down";
      DIR = "down"
      break;
  }
});