const container = document.getElementById('container');
const clear = document.getElementById('clear');

createCells();

//listens for mouse over of each cell
const cells = document.querySelectorAll('.cellDiv');
cells.forEach(cell => { 
    cell.addEventListener('mouseenter', changeColor)
});

clear.addEventListener('click', clearSetGrid);

//creates cells on the grid, intial run is 16x16
function createCells() {
    for(let i = 0; i < 256; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cellDiv')
        container.appendChild(cell);
    }
}

function changeColor(event) {
    event.target.style.backgroundColor = 'black';
}

//clears current grid and asks user for new grid size
function clearSetGrid() {
    cells.forEach(cell => cell.style.backgroundColor = 'white')
    let gridSize = 0;
    while(gridSize >100 || gridSize < 2){
        gridSize = prompt('Enter desired grid size: (100 max, 2 min)');
    }
    
    return gridSize;
}

//todo: seperate initial grid size from new size coming soon
//todo: button for random rbg value on each mouse over event
//todo: button for greyscale 10% blacker each pass over
//todo: further additional features