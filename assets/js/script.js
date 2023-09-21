/*
window.addEventListener("load", gameLoop);
//setInterval(gameLoop, 40);
*/
function gameLoop() {
    setInterval(draw, 40);

}


function draw() {
    const canvas = document.getElementById("game-area");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 450);

        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(Math.floor(Math.random() * 750), Math.floor(Math.random() * 400), 50, 50);
    }
}
window.addEventListener("load", gameLoop);