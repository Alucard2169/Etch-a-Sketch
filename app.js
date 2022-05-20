let root = document.querySelector(':root');
const gridButtons = document.querySelectorAll('.size');
const custom = document.getElementById('custom');
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector('.clear');
const randomBtn = document.querySelector('.random');
const canvas = document.querySelector('.canvas'); 
const colorBtn = document.querySelector('.colorBtn');
const colorPick = document.querySelector("#color");
const eraserBtn = document.querySelector('.eraser');
const colorInput = document.querySelector('#color');

//default values
colorPick.value = "#000000";
custom.value = '';
let currentMode = 'color'
let currentColor = 'black'


// check if mouse is clicked or not
let mouseDown = false;
document.body.onmousedown = function () {
    mouseDown = true;
}
document.body.onmouseup = function () {
    mouseDown = false;
}




// coloring mode function
function setCurrentColor(newColor) {
    currentColor = newColor;
}

// current color function
function setCurrentMode(newMode) {
    activeMode(newMode)
    currentMode = newMode;
}


colorPick.onchange = (e) => setCurrentColor(e.target.value)

colorBtn.addEventListener('click', () => setCurrentMode("color"));
randomBtn.addEventListener('click', () => setCurrentMode("rainbow"));
eraserBtn.addEventListener('click', () => setCurrentMode('erase'));

// main coloring function
function colorPicker(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'erase') {
      e.target.style.backgroundColor = '#ffffff';
    }
    
}


const grid = (value) => {
     root.style.setProperty('--grid-col',value);
    root.style.setProperty('--grid-row', value);
    
    for (let i = 0; i < value * value; i++){
        const cell = document.createElement('div');
        cell.addEventListener('mouseover',colorPicker);
        cell.addEventListener('mousedown',colorPicker);
        canvas.appendChild(cell);
    }
}

// starter grid
grid(16);

// button to make 32x, 64x grid
gridButtons.forEach((button) => {
    button.addEventListener('click', () => {
        grid(0)
        canvas.innerHTML = '';
       grid(button.value)
    })
})

// make custom grid
submitBtn.addEventListener('click', () => {
    if (custom.value <= 0) {
        alert("Invalid value, can only be number greater than 1");
        custom.value = '';
        return
    }
    else if (custom.value > 100) {
        alert(`can't be greater than 100`);
        custom.value = '';
        return;
    }
    else {
        canvas.innerHTML = '';
        grid(custom.value)
        custom.value = ''
    }
})

// clear canvas
clearBtn.addEventListener('click', () => {
    grid(0)
    canvas.innerHTML = ''
})


const activeMode = (but) => {
    if (but == 'rainbow') {
        randomBtn.classList.add("active");
        colorBtn.classList.remove("active");
        eraserBtn.classList.remove("active")
    }
    else if(but == 'color'){
        randomBtn.classList.remove("active");
        colorBtn.classList.add("active");
        eraserBtn.classList.remove("active")
    }
    else if (but === 'erase') {
        randomBtn.classList.remove("active");
        colorBtn.classList.remove("active");
        eraserBtn.classList.add("active")

    }
} 