
function initGame() {
    let player = {
        playerId: 1,
        playerX: Math.floor(Math.random() * 750),
        playerY: Math.floor(Math.random() * 400)
    };
    let terrain = {
        height: ["", ""]
    };
    let maxHeight = 50;
    for (n = 0; n < 10; n++) {
        for (m = 0; m < 10; m++) {
            terrain.height[n, m] = Math.floor(Math.random() * maxHeight);
        }
    }
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
    playerDraw(player);
    setInterval(gameLoop, 40, player, terrain);
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
function playerDraw(drawObject) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    if (canvas.getContext) {
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(drawObject.playerX, drawObject.playerY, 50, 50);
        console.log(`draw player at ${drawObject.playerX}, ${drawObject.playerY}`);
    }
}
function terrainDraw(terrain) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    let tileWidth = 80;
    ctx.fillStyle = "#ffffff";
    let heightOffSet = "";
    let heightOffSetX = "";
    let heightOffSetXY = "";
    for (n = 0; n < 10; n++) {
        for (m = 0; m < 10; m++) {
            heightOffSet = terrain.height[n, m];
            heightOffSetX = terrain.height[n + 1, m];
            heightOffSetXY = terrain.height[n + 1, m + 1];
            ctx.beginPath();
            ctx.moveTo(n * tileWidth, (m * tileWidth) - heightOffSet);
            ctx.lineTo((n * tileWidth) + tileWidth, (m * tileWidth) - heightOffSetX);
            ctx.lineTo((n * tileWidth) + tileWidth, (m * tileWidth) + tileWidth - heightOffSetXY);
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
function gameLoop(player, terrain) {
    clearCanvas();
    terrainDraw(terrain);
    console.log(player.playerId);
    playerDraw(player);

}


window.addEventListener("load", initGame);
