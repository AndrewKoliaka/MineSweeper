'use strict';
const ROWS = 8,
      COLS = 8,
      SIZE = 30;

var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

window.addEventListener('load', init, false);


function init() {
    canvas.addEventListener('click', cellClicked, false);
    restart();
}

function restart(){
    battlefield._gameFinished = false;
    document.getElementById('game').style.width = canvas.width + "px";
    document.getElementById('game').style.height = canvas.height + 40 + "px";
    canvas.style.cursor = 'pointer';
    battlefield.fill();
    battlefield.setBombs();
    battlefield.setHints();
    view.clearRect(0, 0, canvas.width, canvas.height);
    view.drawCanvas();
    battlefield.showArray();
    document.getElementById('numBombs').firstElementChild.textContent = battlefield.numBombs;
}

var flags = {
  _flags : [],
    foundBobsEl : document.getElementById('foundBmb').firstElementChild.innerHTML,
    setFlag : function(i, j){
        if(battlefield.getCell(i, j) !== 'f'){
            this._flags.push({
                i : i,
                j : j,
                value : battlefield.getCell(i, j)
            });
            battlefield.setCell(i, j, 'f');
            view.drawFlag(i, j);
            document.getElementById('foundBmb').firstElementChild.innerHTML = parseInt(++found);
        } else {
            this.removeFlag(i, j);
        }

    },
    removeFlag : function(i, j){
        this._flags.forEach(function (el, indx, arr) {
            if(el.i === i && el.j === j){
                battlefield.setCell(i, j, el.value);
                view.clearRect(j * SIZE + 1, i * SIZE + 1, SIZE - 2, SIZE - 2);
                arr.splice(indx, 1);
            }
        });
        document.getElementById('foundBmb').firstElementChild.innerHTML = parseInt(--found);
    }
};

var battlefield = {
    _playground: [],
    numBombs: 10,
    fill: function () {
        for (var i = 0; i < COLS; i++) {
            this._playground[i] = [];
            for (var j = 0; j < ROWS; j++) {
                this._playground[i][j] = 0;
            }
        }
    },
    getCell: function (i, j) {
        return this._playground[i][j]
    },
    setCell: function (i, j, value) {
      this._playground[i][j] = value;
    },
    setBombs: function () {
        var bombs = 0,
            randI, randJ;
        while (bombs < this.numBombs) {
            randI = Math.floor(Math.random() * this._playground.length);
            randJ = Math.floor(Math.random() * this._playground.length);
            if (!this.getCell(randI, randJ)) {
                this.setCell(randI, randJ, '*');
                bombs++;
            }
        }
    },
    setHints: function () {
        var bombcounter = 0;
        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                if (this.getCell(i, j) === '*'){
                    continue;
                }
                for (var c = 1; c > - 2; c--) {
                    for (var r = 1; r > - 2; r--) {
                        if (i - c < 0 || j - r < 0 || i - c > ROWS - 1 || j - r > COLS - 1) {
                            continue;
                        }
                        if (this.getCell(i - c, j - r) === '*') {
                            bombcounter++;
                        }
                    }
                }
                this.setCell(i, j, bombcounter);
                bombcounter = 0;
            }
        }
    },
    showArray : function () {
        var arr = '';
        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                arr += " " + this.getCell(i, j);
            }
            arr += '\n';
        }
        console.log(arr);
    },
    verify: function (i, j) {
        var i1, j1;
        var self = this;

       if(!this.getCell(i ,j)){
           view.open(i, j , this.getCell(i, j));
           this.coordForCheck.forEach(function (el) {
               if(i + el[0] >= 0 && i + el[0] <= ROWS - 1  && j + el[1] >= 0 && j + el[1] <= COLS - 1){
                   i1 = i + el[0];
                   j1 = j + el[1];

                   if(self.getCell(i1, j1) !== 'v' && self.getCell(i1, j1) !== 'f'){
                       self.verify(i1, j1);
                   }
               }
           });
       } else if(this.getCell(i, j) === "*"){
           this.gameOver();
       } else {
           view.open(i, j , this.getCell(i, j));
       }
    },
    coordForCheck : [
        [-1, -1],
        [-1 ,0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ],
    _gameFinished : false,
    gameOver : function(){
        canvas.style.cursor = 'not-allowed';
        this._gameFinished = true;
        this._playground.forEach(function (el, indx) {
            for(var subIndx = 0; subIndx < COLS; subIndx++){
                if(el[subIndx] === '*'){
                    view.open(indx, subIndx, '*');
                }
            }
        })
    }
};

var view = {
    open: function (i, j, symbol) {
        if(battlefield.getCell(i, j) === 'v'){
            return;
        } else if(battlefield.getCell(i, j) === 'f'){
            flags.removeFlag(i, j);
            return;
        }
        switch (symbol) {
            case 0 :
                ctx.fillStyle = '#C7DCED';
                ctx.fillRect(j * SIZE + 1, i * SIZE + 1, SIZE - 2, SIZE - 2);
                break;
            case '*' :
                ctx.fillStyle = '#fdafa1';
                ctx.fillRect(j * SIZE + 1, i * SIZE + 1, SIZE - 2, SIZE - 2);
                ctx.fillStyle = 'black';
                ctx.font = '40px Arial';
                ctx.fillText(symbol, j * SIZE + SIZE / 4, i * SIZE + SIZE + SIZE / 5);
                break;
            default :
                ctx.fillStyle = '#ece3b0';
                ctx.fillRect(j * SIZE + 1, i * SIZE + 1, SIZE - 2, SIZE - 2);
                ctx.fillStyle = 'black';
                ctx.font = '20px Arial';
                ctx.fillText(symbol, j * SIZE + SIZE / 3 - 1, i * SIZE + SIZE - SIZE / 3 + 1);
        }
        battlefield.setCell(i, j, 'v');

    },
    drawCanvas: function(){
        ctx.beginPath();

        for (var i = 0; i < COLS; i++) {
            for (var j = 0; j < ROWS; j++) {
                ctx.strokeRect(j * SIZE, i * SIZE, SIZE, SIZE);
            }
        }
        ctx.stroke();

    },
    drawFlag : function (i, j) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * SIZE + 7, i * SIZE + 5, 12, 12);
        ctx.fillStyle = 'black';
        ctx.fillRect(j * SIZE + 5 + 12, i * SIZE + 5, 3, 18);
        ctx.fillRect(j * SIZE + 5 + 5, i * SIZE + 5 + 18, 16, 3)

    },
    clearRect: function(x, y, width, height){
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, width, height);
    }
};


function cellClicked(e) {
    var i = Math.floor(e.offsetY / SIZE),
        j = Math.floor(e.offsetX / SIZE);

    if(!battlefield._gameFinished){
        if(document.getElementById('flagCh').checked){
            flags.setFlag(i, j);
        } else {
            battlefield.verify(i, j);
        }
    }
}