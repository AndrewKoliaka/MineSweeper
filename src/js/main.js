'use strict';
var rows = 8,
    cols = 8,
    CELL_SIZE = 30;

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

window.addEventListener('load', init, false);

function init() {
    canvas.addEventListener('click', cellClicked, false);
    canvas.addEventListener('contextmenu', cellClicked, false);
    document.getElementById('resBut').addEventListener('click', restart, false);
    var radios = document.getElementsByClassName('level');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', difficultChanged, false);
    }
    restart();
}

function difficultChanged() {
    switch (this.value) {
        case 'first':
            rows = 8;
            cols = 8;
            battlefield.numMines = 10;
            break;
        case 'second':
            rows = 16;
            cols = 16;
            battlefield.numMines = 40;
            break;
        case 'third':
            rows = 30;
            cols = 16;
            battlefield.numMines = 99;
            break;
    }
    restart();
}

function restart() {
    canvas.width = rows * CELL_SIZE;
    canvas.height = cols * CELL_SIZE;
    battlefield._gameFinished = false;
    document.getElementById('game').style.width = canvas.width + "px";
    document.getElementById('game').style.height = canvas.height + 40 + "px";
    canvas.style.cursor = 'pointer';
    battlefield.fill();
    battlefield.setBombs();
    battlefield.setHints();
    view.clearRect(0, 0, canvas.width, canvas.height);
    view.drawCanvas();
    flags.foundBombs = 0;
    flags._flags = [];
    document.getElementById('numBombs').firstElementChild.textContent = battlefield.numMines.toString();
    document.getElementById('foundBmb').firstElementChild.textContent = flags.foundBombs.toString();
}

function cellClicked(e) {
    if (battlefield._gameFinished) {
        return;
    }
    var i = Math.floor(e.offsetY / CELL_SIZE),
        j = Math.floor(e.offsetX / CELL_SIZE);

    if (i > cols - 1 || j > rows - 1) {
        return;
    }

    if (e.button === 2) {
        flags.setFlag(i, j);
    } else if (e.button === 0) {
        battlefield.verify(i, j);
    }
    battlefield.checkWin();
}
