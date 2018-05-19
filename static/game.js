var socket = io();
socket.on('game', function(data) {
    console.log(data);
});