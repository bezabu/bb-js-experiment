let canvas = document.getElementById("game-area");
let ctx = canvas.getContext("2d");
let CANVAS_WIDTH = canvas.width = 800;
let CANVAS_HEIGHT = canvas.height = 450;
let img = new Image(); // Create new img element
img.src = "../assets/images/tree01.png"; // Set source path
img.onload = () => {
    ctx.drawImage(img, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
};


function initGame() {
    setInterval(gameLoop, 40);
}

function gameLoop() {
    checkCanvas();
    clearCanvas();
}
function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#ffaaff";
    ctx.fillRect(CANVAS_WIDTH / 3, CANVAS_HEIGHT / 3, CANVAS_WIDTH / 3, CANVAS_HEIGHT / 3);
    ctx.drawImage(img, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}
function checkCanvas() {
    //canvas = document.getElementById("game-area");

    //CANVAS_WIDTH = canvas.width;
    //CANVAS_HEIGHT = canvas.height;

    console.log(`${canvas.style.width},${canvas.style.height}`);
    console.log(`canvas is ${CANVAS_WIDTH} by ${CANVAS_HEIGHT}`);
}
window.addEventListener("load", initGame);
