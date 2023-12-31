let xScreenOffset = 0;
let yScreenOffset = 0;
let tileWidth = 80;
function initGame() {
    const imgTree = new Image(); // Create new img element
    imgTree.src = "../assets/images/tree01.png"; // Set source path
    imgTree.onload = () => {
    };
    let player = {
        playerId: 1,
        playerX: 5,
        playerY: 1
    };
    let terrain = [];
    let trees = [];
    let rows = 11;
    let columns = 11;
    // creating two-dimensional array
    for (let i = 0; i < rows; i++) {
        terrain[i] = [];
        trees[i] = [];
        for (let j = 0; j < columns; j++) {
            terrain[i][j] = j;
            trees[i][j] = j;
        }
    }
    //heightmap
    let maxHeight = 50;
    for (let n = 0; n < 10; n++) {
        for (let m = 0; m < 10; m++) {
            terrain[n][m] = Math.floor(Math.random() * maxHeight);
            //console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
        }
    }
    //trees
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
        playerMove(player, event.key, 0.5);
    });
    console.log("initialized");
    playerDraw(player, terrain);
    setInterval(gameLoop, 40, player, terrain, trees);
}
//Isometric conversions
function getIsoX(x, y, tileWidth, tileHeight) {
    let isoX = ((x - y) * tileWidth);
    return isoX;
}
function getIsoY(x, y, tileWidth, tileHeight) {
    let isoY = ((x + y) * tileHeight);
    return isoY;
}
function inverseIsoX(x, y, tileWidth, tileHeight) {
    halfTileWidth = tileWidth / 2;
    halfTileHeight = tileHeight / 2;
    let mapX = (x / halfTileWidth + (y / halfTileHeight)) / 2;
    return mapX;
}
function inverseIsoY(x, y, tileWidth, tileHeight) {
    halfTileWidth = tileWidth / 2;
    halfTileHeight = tileHeight / 2;
    let mapY = (y / halfTileHeight - (x / halfTileWidth)) / 2;
    return mapY;
}
//move player
function playerMove(player, eventKey, moveAmount) {
    if (eventKey === "ArrowLeft") {
        player.playerX -= moveAmount;
        player.playerY += moveAmount;
        xScreenOffset += tileWidth;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowRight") {
        player.playerX += moveAmount;
        player.playerY -= moveAmount;
        xScreenOffset -= tileWidth;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowUp") {
        player.playerX -= moveAmount;
        player.playerY -= moveAmount;
        yScreenOffset += tileWidth / 2;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }
    if (eventKey === "ArrowDown") {
        player.playerX += moveAmount;
        player.playerY += moveAmount;
        yScreenOffset -= tileWidth / 2;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }
}
function playerDraw(drawObject, terrain) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    let yOffset = 0;
    yOffset = terrain[Math.floor(drawObject.playerX / tileWidth)][Math.floor(drawObject.playerY / tileWidth)];
    if (canvas.getContext) {
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(getIsoX(drawObject.playerX, drawObject.playerY, tileWidth, tileWidth / 2) + xScreenOffset, getIsoY(drawObject.playerX, drawObject.playerY, tileWidth, tileWidth / 2) - yOffset + yScreenOffset, 50, 50);
        //ctx.fillRect(drawObject.playerX, drawObject.playerY - yOffset, 50, 50);
        console.log(`draw player at ${drawObject.playerX}, ${drawObject.playerY}`);
    }
}
function terrainDraw(drawObject, terrain, trees) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#ffffff";
    let playerDrawn = 0;
    let heightOffSet = "";
    let heightOffSetNextX = "";
    let heightOffSetNextXY = "";
    for (let n = 1; n < 10; n++) {
        for (let m = 1; m < 10; m++) {
            heightOffSet = terrain[n][m];
            heightOffSetNextX = terrain[n + 1][m];
            heightOffSetNextXY = terrain[n + 1][m + 1];
            getIsoX(n, m, tileWidth, tileWidth / 2);
            getIsoY(n, m, tileWidth, tileWidth / 2);
            ctx.beginPath();
            ctx.moveTo(getIsoX(n, m, tileWidth, tileWidth / 2) + xScreenOffset, getIsoY(n, m, tileWidth, tileWidth / 2) - heightOffSet + yScreenOffset);
            ctx.lineTo(getIsoX(n + 1, m, tileWidth, tileWidth / 2) + xScreenOffset, getIsoY(n + 1, m, tileWidth, tileWidth / 2) - heightOffSetNextX + yScreenOffset);
            ctx.lineTo(getIsoX(n + 1, m + 1, tileWidth, tileWidth / 2) + xScreenOffset, getIsoY(n + 1, m + 1, tileWidth, tileWidth / 2) - heightOffSetNextXY + yScreenOffset);
            //ctx.lineTo((n * tileWidth) + tileWidth, (m * tileWidth) + tileWidth);
            ctx.stroke();
        }
    }
    ctx.fillStyle = "#00ffff";
    for (let n = 1; n < 10; n++) {
        for (let m = 1; m < 10; m++) {

            if (trees[n][m] == 1) {
                //ctx.drawImage((imgTree, (n * tileWidth) - (tileWidth / 2), ((m * tileWidth) - heightOffSet) - (tileWidth / 2));
                //ctx.fillRect((n * tileWidth) - (tileWidth / 2), ((m * tileWidth) - heightOffSet) - (tileWidth / 2), 40, 70);
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
function gameLoop(player, terrain, trees) {
    clearCanvas();
    terrainDraw(player, terrain, trees);
    //console.log(player.playerId);
    playerDraw(player, terrain);
}
window.addEventListener("load", initGame);
