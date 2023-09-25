let terrain = [];
let rows = 10;
let columns = 10;

// creating two-dimensional array
for (let i = 0; i < rows; i++) {
    terrain[i] = [];
    for (let j = 0; j < columns; j++) {
        terrain[i][j] = Math.floor(Math.random() * 20);
        console.log(terrain[i][j]);
    }
}
console.log(terrain);
