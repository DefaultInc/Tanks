var map = new Array([]);
var c = document.getElementById("FIELD");
var ctx = c.getContext("2d");

for (var i = 0; i < 1024; i++) {
    map.push([])
    for (var j = 0; j < 1024; j++)
        map[i][j] = 0;
}



function drawMap(){
    for (var i = 0; i < 1024; i++) {
        for (var j = 0; j < 1024; j++) {
            if (map[i][j] === 1) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(i, j, 1, 1);
            }
        }
        
    }
}

function fillArray(x, y, w, h){
    for(var i = 0; i < w; i++) {
        for(var j = 0; j < h; j++) {
            map[x + i][y + j] = 1
        }
    }
}

function generateMap() {
    ctx.fillStyle = "#FF0000";    
    fillArray(210, 130, 80, 320);
    fillArray(420, 130, 80, 320);
    fillArray(650, 130, 80, 320);
    fillArray(210, 610, 520, 80);
    fillArray(420, 800, 80, 200);
    // fillArray(720, 120, 80, 320);
    // fillArray(880, 120, 80, 320);
    
    // fillArray(80, 600, 80, 320);
    // fillArray(240, 600, 80, 320);
    // fillArray(400, 680, 80, 240);
    // fillArray(560, 680, 80, 240);
    // fillArray(720, 600, 80, 320);
    // fillArray(880, 600, 80, 320);
}


generateMap()
drawMap()