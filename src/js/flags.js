'use strict'
var flags = {
    _flags: [],
    foundBombs: 0,
    setFlag: function(i, j) {
        var value = battlefield.getCell(i, j);
        if (value === 'v') {
            return;
        }
        if (value !== 'f') {
            this._flags.push({
                i: i,
                j: j,
                value: value
            });
            battlefield.setCell(i, j, 'f');
            view.drawFlag(i, j);

            document.getElementById('foundBmb').firstElementChild.textContent = (++this.foundBombs).toString();
        } else {
            this.removeFlag(i, j);
        }
    },
    removeFlag: function(i, j) {
        this._flags.forEach(function(el, indx, arr) {
            if (el.i === i && el.j === j) {
                battlefield.setCell(i, j, el.value);
                view.clearRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                arr.splice(indx, 1);
            }
        });
        document.getElementById('foundBmb').firstElementChild.textContent = (--this.foundBombs).toString();
    }
};
