/*
window.addEventListener("load", gameLoop);
//setInterval(gameLoop, 40);
function gameLoop() {
    let canvas = document.getElementById('game-area');
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = #000000;
    fillRect(5, 5, 20, 20);

}
*/

function draw() {
    const canvas = document.getElementById("game-area");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 450);
    }
}
window.addEventListener("load", draw);