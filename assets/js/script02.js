
function initGame() {
    const imgTree = new Image(); // Create new img element
    imgTree.src = "../assets/images/tree01.png"; // Set source path
    imgTree.onload = () => {

    };
    let player = {
        playerId: 1,
        playerX: Math.floor(Math.random() * 750),
        playerY: Math.floor(Math.random() * 400)
    };

    let terrain = [];
    let trees = [];
    let rows = 11;
    let columns = 11;
    let tileWidth = 80;
    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        terrain[i] = [];
        trees[i] = [];
        for (let j = 0; j < columns; j++) {
            terrain[i][j] = j;
            trees[i][j] = j;
        }
    }
    let maxHeight = 50;
    for (let n = 0; n < 10; n++) {
        for (let m = 0; m < 10; m++) {
            terrain[n][m] = Math.floor(Math.random() * maxHeight);
            //console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
        }
    }
    //console.log(terrain.height);
    for (let n = 0; n < 10; n++) {
        for (let m = 0; m < 10; m++) {

            terrain[n][m] = Math.floor(Math.random() * maxHeight);
            //console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
            trees[n][m] = Math.round(Math.random());
            //console.log(`Cell ${n},${m} tree value: ${trees[n][m]}`);
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
    playerDraw(player, terrain, tileWidth);
    setInterval(gameLoop, 40, player, terrain, tileWidth, trees);
}
function getIsoX(x,y,tileWidth,tileHeight) {
    
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
        console.log(`draw player at ${drawObject.playerX}, ${drawObject.playerY}`);
    }
}
function terrainDraw(drawObject, terrain, tileWidth, trees) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    let playerDrawn = 0;
    let heightOffSet = "";
    let heightOffSetNextX = "";
    let heightOffSetNextXY = "";
    for (let n = 1; n < 10; n++) {
        for (let m = 1; m < 10; m++) {
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
    ctx.fillStyle = "#00ffff";
    for (let n = 1; n < 10; n++) {
        for (let m = 1; m < 10; m++) {

            if (trees[n][m] == 1) {
                //ctx.drawImage((imgTree, (n * tileWidth) - (tileWidth / 2), ((m * tileWidth) - heightOffSet) - (tileWidth / 2));
                ctx.fillRect((n * tileWidth) - (tileWidth / 2), ((m * tileWidth) - heightOffSet) - (tileWidth / 2), 40, 70);
            }
            //playerDraw(drawObject, terrain, tileWidth);
            //ctx.fillStyle = "#00ffff";

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
function gameLoop(player, terrain, tileWidth, trees) {
    clearCanvas();
    terrainDraw(player, terrain, tileWidth, trees);
    //console.log(player.playerId);
    playerDraw(player, terrain, tileWidth);

}


window.addEventListener("load", initGame);
