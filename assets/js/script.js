
function initGame() {
    let player = {
        playerId: 1,
        playerX: Math.floor(Math.random() * 750),
        playerY: Math.floor(Math.random() * 400)
    };

    let terrain = [];
    let rows = 11;
    let columns = 11;
    let tileWidth = 80;
    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        terrain[i] = [];
        for (let j = 0; j < columns; j++) {
            terrain[i][j] = j;
        }
    }
    let maxHeight = 50;
    for (n = 0; n < 10; n++) {
        for (m = 0; m < 10; m++) {
            terrain[n][m] = Math.floor(Math.random() * maxHeight);
            console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
        }
    }

    console.log(terrain.height);
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    if (canvas.getContext) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 450);
    }
    document.addEventListener('keydown', function (event) {
        playerMove(player, event.key);
    });
    console.log("initialized");
    playerDraw(player, terrain, tileWidth);
    setInterval(gameLoop, 40, player, terrain, tileWidth);
}


function playerMove(player, eventKey) {
    if (eventKey === "ArrowLeft") {
        player.playerX -= 10;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowRight") {
        player.playerX += 10;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowUp") {
        player.playerY -= 10;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }
    if (eventKey === "ArrowDown") {
        player.playerY += 10;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }

}
function playerDraw(drawObject, terrain, tileWidth) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    let yOffset = 0;
    yOffset = terrain[Math.floor(drawObject.playerX / tileWidth)][Math.floor(drawObject.playerY / tileWidth)];
    if (canvas.getContext) {
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(drawObject.playerX, drawObject.playerY - yOffset, 50, 50);
        //console.log(`draw player at ${drawObject.playerX}, ${drawObject.playerY}`);
    }
}
function terrainDraw(terrain, tileWidth) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    let heightOffSet = "";
    let heightOffSetNextX = "";
    let heightOffSetNextXY = "";
    for (n = 1; n < 10; n++) {
        for (m = 1; m < 10; m++) {
            heightOffSet = terrain[n][m];
            heightOffSetNextX = terrain[n + 1][m];
            heightOffSetNextXY = terrain[n + 1][m + 1];
            ctx.beginPath();
            ctx.moveTo(n * tileWidth, (m * tileWidth) - heightOffSet);
            ctx.lineTo((n + 1) * tileWidth, (m * tileWidth) - heightOffSetNextX);
            ctx.lineTo((n + 1) * tileWidth, ((m + 1) * tileWidth) - heightOffSetNextXY);
            //ctx.lineTo((n * tileWidth) + tileWidth, (m * tileWidth) + tileWidth);
            ctx.fill();
        }
    }
}
function clearCanvas() {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    if (canvas.getContext) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 450);
    }
}
function gameLoop(player, terrain, tileWidth) {
    clearCanvas();
    terrainDraw(terrain, tileWidth);
    console.log(player.playerId);
    playerDraw(player, terrain, tileWidth);

}


window.addEventListener("load", initGame);
