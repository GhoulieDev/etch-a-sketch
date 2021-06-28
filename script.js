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
let penColor = `rgba(0, 0, 0, 1)`;
let randomColor = false;
let r, g, b;
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
        cell.style.backgroundColor = 'rgba(255, 255, 255, 1)';
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
        penColor = `rgba(${r}, ${g}, ${b}, 1)`;
    }

    if(grayscaleColor) {
        let currentColor = event.target.style.backgroundColor;
        //if current color is black, dont do anything
        if (currentColor == 'rgb(0, 0, 0)') {
            return;
        }else if (currentColor.indexOf('a') != -1) {
        //if current cell has an alpha value get it and increase it by 10% 
            let getCurrentOpacity = Number(currentColor.slice(-4, -1));
            if (getCurrentOpacity <= 0.9) {
                penColor = `rgba(0, 0, 0, ${getCurrentOpacity + 0.1})`
            }
        }else{
        //if not black cell, and doesnt have an alpha, set it now
            penColor = 'rgba(0, 0, 0, 0.1)';
        }
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

createGrid(getGridArea());


