
function initGame() {
    let player = {
        playerId: 1,
        playerX: Math.floor(Math.random() * 750),
        playerY: Math.floor(Math.random() * 400)
    };
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
    setInterval(gameLoop, 40, player);
}


function playerMove(player, eventKey) {
    if (eventKey === "ArrowLeft") {
        player.playerX -= 10;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    } else if (eventKey === "ArrowRight") {
        player.playerX += 10;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    } else if (eventKey === "ArrowUp") {
        player.playerY -= 10;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    } else if (eventKey === "ArrowDown") {
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
function clearCanvas() {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    if (canvas.getContext) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 450);
    }
}
function gameLoop(player) {
    clearCanvas();
    console.log(player.playerId);
    playerDraw(player);

}


window.addEventListener("load", initGame);
