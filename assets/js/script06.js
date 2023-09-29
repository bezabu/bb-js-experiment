let canvas = document.getElementById("game-area");
let ctx = canvas.getContext("2d");
let CanvasWidth = canvas.width = 800;
let CanvasHeight = canvas.height = 450;
let treeLoad = 0;
let rockLoad = 0;
let maxHeight = 20;
let imgTree = new Image(); // Create new img element
imgTree.src = "../assets/images/tree01.png"; // Set source path
imgTree.onload = () => {
    //tree image is loaded
    treeLoad = 1;
};
let imgRock = new Image(); // Create new img element
imgRock.src = "../assets/images/tree01.png"; // Set source path
imgRock.onload = () => {
    //rock image is loaded
    rockLoad = 1;
};
//create arrays for storing object coordinates
let heightMap = [];
let treeMap = [];
let rockMap = [];
//create the draw list
let drawList = [];
// creating two-dimensional arrays for height, trees and rocks
for (let i = 0; i < rows; i++) {
    heightMap[i] = [];
    treeMap[i] = [];
    rockMap[i] = [];
    for (let j = 0; j < columns; j++) {
        heightMap[i][j] = j;
        treeMap[i][j] = j;
        rockMap[i][j] = j;
    }
}

let entry = new drawObject();
drawList.push(entry);
//create the draw list
function drawObject(newType, newX, newY, newImageType) {
    this.type = newType;
    this.x = newX;
    this.y = newY;
}
//heightmap
for (let n = 0; n < 10; n++) {
    for (let m = 0; m < 10; m++) {
        heightMap[n][m] = Math.floor(Math.random() * maxHeight);
        //console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
        if (myGetRandomInt(3) > 2) {
            //one in 4 chance to make a tree
            treeMap[n][m] = 1;
            //enter the object in the drawobject list
            let entry = new drawObject(treeImg, n, m);
            drawList.push(entry);
        } else {
            if (myGetRandomInt(5) > 4) treeMap[n][m] = 1;
            //enter the object in the drawobject list
            let entry = new drawObject(rockImg, n, m);
            drawList.push(entry);
            //one in 6 chance to make a rock
        }
    }
}

function drawImages() {
    for (let i = 0; i < drawObject.length; i++) {
        //cycle through drawobjects
        //call the drawimage
    }
}
//draw an image
function drawThis(imageToDraw, x, y) {
    ctx.drawImage(imageToDraw, x, y);
}


//returns a random integer between 0 and maxNum
function myGetRandomInt(maxNum) {
    let randomInt = Math.floor(Math.random() * maxNum);
    return randomInt;
}
//clears the canvas ready for next frame
function clearCanvas() {
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
}
//main game loop
function gameLoop() {

}

setInterval(gameLoop, 40);