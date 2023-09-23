/*
window.addEventListener("load", gameLoop);
//setInterval(gameLoop, 40);
*/

function initGame() {
    const filmCard = new Image(); // Create new img element
    filmCard.addEventListener("load", gameLoop);
    filmCard.src = "./assets/images/filmcard6.jpg"; // Set source path

    //gameLoop();
}

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
        ctx.drawImage(filmCard, 25, 25);
    }
}
window.addEventListener("load", initGame);
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);