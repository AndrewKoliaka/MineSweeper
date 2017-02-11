'use strict'
var battlefield = {
    _playground: [],
    numMines: 10,
    _gameFinished: false,
    fill: function() {
        for (var i = 0; i < cols; i++) {
            this._playground[i] = [];
            for (var j = 0; j < rows; j++) {
                this.setCell(i, j, 0);
            }
        }
    },
    getCell: function(i, j) {
        return this._playground[i][j];
    },
    setCell: function(i, j, value) {
        this._playground[i][j] = value;
    },
    setBombs: function() {
        var bombs = 0,
            randI, randJ;
        while (bombs < this.numMines) {
            randI = Math.floor(Math.random() * cols);
            randJ = Math.floor(Math.random() * rows);
            if (!this.getCell(randI, randJ)) {
                this.setCell(randI, randJ, '*');
                bombs++;
            }
        }
    },
    setHints: function() {
        var bombcounter = 0;
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (this.getCell(i, j) === '*') {
                    continue;
                }
                for (var c = 1; c > -2; c--) {
                    for (var r = 1; r > -2; r--) {
                        if (i - c < 0 || j - r < 0 || i - c > cols - 1 || j - r > rows - 1) {
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
    verify: function(i, j) {
        var i1, j1,
            self = this,
            value = this.getCell(i, j);
        if (!value) {
            view.open(i, j, value);
            this.coordForCheck.forEach(function(el) {
                if (i + el[0] >= 0 && i + el[0] <= cols - 1 && j + el[1] >= 0 && j + el[1] <= rows - 1) {
                    i1 = i + el[0];
                    j1 = j + el[1];

                    if (self.getCell(i1, j1) !== 'v' && self.getCell(i1, j1) !== 'f') {
                        self.verify(i1, j1);
                    }
                }
            });
        } else if (value === "*") {
            view.open(i, j, value);
            this.gameOver();
        } else if (value === "f") {
            flags.removeFlag(i, j);
        } else {
            view.open(i, j, value);
        }
    },
    coordForCheck: [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ],
    gameOver: function() {
        this._playground.forEach(function(el, indx) {
            for (var subIndx = 0; subIndx < rows; subIndx++) {
                if (el[subIndx] === '*') {
                    view.open(indx, subIndx, '*');
                }
            }
        });
        flags._flags.forEach(function(el) {
            if (el.value === '*') {
                view.open(el.i, el.j, el.value);
            }
        });
        canvas.style.cursor = 'not-allowed';
        this._gameFinished = true;
    },
    checkWin: function() {
        var viwed = 0,
            flaged = 0;
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (this.getCell(i, j) === 'v') {
                    viwed++;
                } else if (this.getCell(i, j) === 'f') {
                    flaged++
                }
            }
        }
        if (flaged === this.numMines && viwed + flaged === rows * cols) {
            this._gameFinished = true;
            canvas.style.cursor = 'not-allowed';
            setTimeout(function() { alert('you win!!!') }, 10);
        }
    }
};
