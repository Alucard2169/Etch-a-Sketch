const container = document.querySelector('.container');
const button = document.createElement('button');
let size;

button.classList.add('clear')
button.innerText = 'CLEAR'
document.body.appendChild(button)

button.addEventListener('click', function (){
    container.innerHTML = '';
    size = prompt('what size do you want your grid to be: ');
    checkSize(size);
})


function canvas(size) {
    container.style.setProperty('--grid-column', size);
    container.style.setProperty('--grid-row', size);

    for (let i = 0; i < size*size; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        container.appendChild(cell).className = 'grid-items';
    }
}
canvas(16)


function changeColor(e) {
    if (e.type == 'mouseover' && !mousedown) return
    else{
        let color1 = Math.floor(Math.random() * 256);
        let color2 = Math.floor(Math.random() * 256);
        let color3 = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${color1},${color2},${color3})`
    }
}

function checkSize(e) {
    if (e > 100) {
        alert("size can't be greater than 100");
        canvas(16)
    }
    else {
        canvas(e)
    }
}

