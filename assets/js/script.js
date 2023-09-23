
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
    console.log("initialized");
    playerDraw(player);
    setInterval(gameLoop(player), 40);
}

function playerStep() {

}

function playerDraw(drawObject) {
    const canvas = document.getElementById("game-area");
    const ctx = canvas.getContext("2d");
    if (canvas.getContext) {
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(drawObject.playerX, drawObject.playerY, 50, 50);
    }
}

function gameLoop(player) {
    console.log(player.playerId);
    playerStep();
    playerDraw(player);
}


window.addEventListener("load", initGame);