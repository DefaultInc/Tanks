GAME_INTERVAL = 500
FIELD = "FIELD"
var c=new Image(100,100)
c.src = "/static/tankBlack_outline.png?x76964"
document.body.appendChild(c);
c.style.position = "absolute"
players = [{e: c, x: 100, y: 10}]

var socket = io();
socket.on('game', function(data) {

});

function DRAW() {
	players.forEach(player => {
		player.e.style.left = player.x+'px';
		player.e.style.top = player.y+'px';
	})
}

function sendState() {

}

function update() {
	players[0].x += 10
	DRAW()
}

setInterval(function() {
	update();
	sendState();
}, GAME_INTERVAL);

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.dir = "left";
      break;
    case 87: // W
      movement.dir = "top";
      break;
    case 68: // D
      movement.dir = "right";
      break;
    case 83: // S
      movement.dir = "down";
      break;
  }
});