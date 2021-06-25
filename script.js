const container = document.getElementById('container');
const clear = document.getElementById('clear');
const random = document.getElementById('random');
const grayscale = document.getElementById('grayscale');

clear.addEventListener('click', resetGrid);
random.addEventListener('click', () => {
    randomColor = true;
    grayscaleColor = false;
});
grayscale.addEventListener('click', () => {
    grayscaleColor = true;
    randomColor = false;
});

let gridSize;
let penColor = 'black';
let randomColor = false;
let r;
let g;
let b;
let grayscaleColor = false;


function getGridArea() {
    do {
       gridSize = prompt('Enter grid size (100 max, 2 min)');
    }while (gridSize > 100 || gridSize < 2);
    
    let gridArea = gridSize * gridSize;
    return gridArea;
}

function createGrid(gridLength) {
    container.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
    
    for(let i = 1; i <= gridLength; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cellDiv');
        container.appendChild(cell);
    }
    addListeners();
}

function addListeners () {
    const boxes = document.querySelectorAll('.cellDiv');
    boxes.forEach(box => { 
    box.addEventListener('mouseenter', draw)
});
}

function draw(event) {
    if(randomColor) {
        r = Math.floor(Math.random()*256);
        g = Math.floor(Math.random()*256);
        b = Math.floor(Math.random()*256);
        penColor = `rgb(${r}, ${g}, ${b})`;
    }

    if(grayscaleColor) {
        //code here for grayscale
    }
    event.target.style.backgroundColor = `${penColor}`;
}

function resetGrid() {
    //remove listeners, removes divs, runs new grid creation
    const boxes = document.querySelectorAll('.cellDiv');
    boxes.forEach(box => { 
    box.removeEventListener('mouseenter', draw)
    });    

    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(getGridArea());
   
}

//inital grid creation call
createGrid(getGridArea());

//todo: button for greyscale 10% blacker each pass over
//todo: further additional features