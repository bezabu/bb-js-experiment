const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 800, 450);
const img = new Image(); // Create new img element
img.src = "../assets/images/filmcard6.jpg"; // Set source path
img.onload = () => {
    ctx.drawImage(img, 10, 10);
};
//must wait until image has loaded