let canvas = document.getElementById("game-area");
let ctx = canvas.getContext("2d");
let CanvasWidth = canvas.width = 800;
let CanvasHeight = canvas.height = 450;
let treeLoad = 0;
let rockLoad = 0;
let maxHeight = 20;
let rows = 11;
let columns = 11;
let player = {
    playerId: 1,
    playerX: 5,
    playerY: 5
};
let moveAmount = 1;
let imgPlayer = new Image(); // Create new img element
imgPlayer.src = "../assets/images/filmcard6.jpg"; // Set source path
imgPlayer.onload = () => {
    //tree image is loaded
    treeLoad = 1;
};
let imgTree = new Image(); // Create new img element
imgTree.src = "../assets/images/tree01.png"; // Set source path
imgTree.onload = () => {
    //tree image is loaded
    treeLoad = 1;
};
let imgRock = new Image(); // Create new img element
imgRock.src = "../assets/images/rock_placeholder.png"; // Set source path
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



//create the draw list object type
function DrawObject(newType, newX, newY) {
    this.type = newType;
    this.x = newX;
    this.y = newY;
}
let playerDrawObject = new DrawObject(imgPlayer, player.playerX, player.playerY);
drawList.push(playerDrawObject);
//heightmap
for (let n = 0; n < 10; n++) {
    for (let m = 0; m < 10; m++) {
        heightMap[n][m] = Math.floor(Math.random() * maxHeight);
        //console.log(`Cell ${n},${m} height value ${terrain[n][m]}`);
        if (myGetRandomInt(3) > 2) {
            //one in 4 chance to make a tree
            treeMap[n][m] = 1;
            //enter the object in the drawobject list
            let entry = new DrawObject(imgTree, n, m);
            drawList.push(entry);
            console.log(`New tree, ${entry} at ${n},${m}`);
        } else {
            if (myGetRandomInt(4) > 3) {
                rockMap[n][m] = 1;
                //enter the object in the drawobject list
                let entry = new DrawObject(imgRock, n, m);
                drawList.push(entry);
                console.log(`New rock, ${entry} at ${n},${m}`);
                //one in 5 chance to make a rock
            }
        }
    }
}
sortImages();
function updatePlayerDrawObject() {
    //update the position of the player in the player draw object
    playerDrawObject.x = player.playerX;
    playerDrawObject.y = player.playerY;
}
function drawImages() {
    for (let i = 0; i < drawList.length; i++) {
        //cycle through drawobjects
        //call the drawimage

        drawThis(drawList[i].type, drawList[i].x, drawList[i].y);
        //console.log(`draw ${i}: ${drawList[i].y}`);
    }
}
function sortImages() {
    drawList.sort(function (a, b) { return a.y - b.y; });

}
//draw an image
function drawThis(imageToDraw, x, y) {
    ctx.drawImage(imageToDraw, x * 50, y * 50);
    console.log(`draw ${imageToDraw} at ${x},${y}`);
}


//returns a random integer between 0 and maxNum
function myGetRandomInt(maxNum) {
    let randomInt = Math.round(Math.random() * maxNum);
    console.log(`random int: ${randomInt}`);
    return randomInt;
}
//clears the canvas ready for next frame
function clearCanvas() {
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
}


//move player
function playerMove(player, eventKey, moveAmount) {
    if (eventKey === "ArrowLeft") {
        player.playerX -= moveAmount;
        //player.playerY += moveAmount;
        xScreenOffset += tileWidth;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowRight") {
        player.playerX += moveAmount;
        //player.playerY -= moveAmount;
        xScreenOffset -= tileWidth;
        console.log(`${eventKey}, new X: ${player.playerX}.`);
    }
    if (eventKey === "ArrowUp") {
        //player.playerX -= moveAmount;
        player.playerY -= moveAmount;
        yScreenOffset += tileWidth / 2;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }
    if (eventKey === "ArrowDown") {
        //player.playerX += moveAmount;
        player.playerY += moveAmount;
        yScreenOffset -= tileWidth / 2;
        console.log(`${eventKey}, new Y: ${player.playerY}.`);
    }
}

//main game loop
function gameLoop() {
    clearCanvas();
    updatePlayerDrawObject();
    sortImages();
    drawImages();
}

setInterval(gameLoop, 40);

document.addEventListener('keydown', function (event) {
    playerMove(player, event.key, 0.5);
});