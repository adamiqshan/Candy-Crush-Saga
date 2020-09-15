const cellCount = 8;
const grid = document.querySelector('.grid');
const colors = ['red', 'green', 'yellow', 'grey', 'blue', 'orange']
const cells = []
let score = 0;

function createBoard() {
    for (var i = 0; i < cellCount * cellCount; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('draggable', true)
        cell.setAttribute('id', i)
        var random = Math.floor(Math.random() * colors.length);
        cell.style.backgroundColor = colors[random]
        grid.appendChild(cell)
        cells.push(cell)
    }
}

createBoard()

let idBeingDragged;
let colorBeingDragged;
let idBeingReplaced;
let colorBeingReplaced;

cells.forEach(cell => cell.addEventListener('dragstart', dragStart))
cells.forEach(cell => cell.addEventListener('dragend', dragEnd))
cells.forEach(cell => cell.addEventListener('dragover', dragOver))
cells.forEach(cell => cell.addEventListener('dragenter', dragEnter))
cells.forEach(cell => cell.addEventListener('dragleave', dragLeave))
cells.forEach(cell => cell.addEventListener('drop', dragDrop))

function dragStart() {
    idBeingDragged = parseInt(this.id);
    colorBeingDragged = this.style.backgroundColor
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave(e) {
    e.preventDefault()
}

function dragDrop() {
    idBeingReplaced = parseInt(this.id)
    colorBeingReplaced = this.style.backgroundColor

    this.style.backgroundColor = colorBeingDragged;
    cells[idBeingDragged].style.backgroundColor = colorBeingReplaced;
}

function dragEnd() {

    let validMoves = [idBeingDragged + 1, idBeingDragged - 1, idBeingDragged + cellCount, idBeingDragged - cellCount]
    let validMove = validMoves.includes(idBeingReplaced)

    if (validMove && idBeingReplaced) {
        idBeingReplaced = null
    } else if (idBeingReplaced && !validMove) {
        cells[idBeingReplaced].style.backgroundColor = colorBeingReplaced
        cells[idBeingDragged].style.backgroundColor = colorBeingDragged
    } else cells[idBeingDragged].style.backgroundColor = colorBeingDragged

}


function rowCheckThree() {
    for (i = 0; i < 62; i++) {
        let rowToCheck = [i, i + 1, i + 2]
        let chosenColor = cells[i].style.backgroundColor
        const isBlank = cells[i].style.backgroundColor === ''

        if (rowToCheck.every(index => cells[index].style.backgroundColor === chosenColor && !isBlank)) {
            score = +3

            rowToCheck.forEach(index => {
                cells[index].style.backgroundColor = ''
            })
        }
    }
}

rowCheckThree()