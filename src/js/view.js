'use strict'
var view = {
    open: function(i, j, symbol) {
        if (battlefield.getCell(i, j) === 'v') {
            return;
        }
        switch (symbol) {
            case 0:
                ctx.fillStyle = '#C7DCED';
                ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                break;
            case '*':
                ctx.fillStyle = '#fdafa1';
                ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                ctx.fillStyle = 'black';
                ctx.font = '40px Arial';
                ctx.fillText(symbol, j * CELL_SIZE + CELL_SIZE / 5 - 1, i * CELL_SIZE + CELL_SIZE + CELL_SIZE / 5);
                break;
            default:
                ctx.fillStyle = '#ece3b0';
                ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                ctx.fillStyle = 'black';
                ctx.font = '20px Arial';
                ctx.fillText(symbol, j * CELL_SIZE + CELL_SIZE / 3 - 1, i * CELL_SIZE + CELL_SIZE - CELL_SIZE / 3 + 1);
        }
        battlefield.setCell(i, j, 'v');

    },
    drawCanvas: function() {
        ctx.beginPath();

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
        ctx.stroke();

    },
    drawFlag: function(i, j) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j * CELL_SIZE + 7, i * CELL_SIZE + 5, 12, 12);
        ctx.fillStyle = 'black';
        ctx.fillRect(j * CELL_SIZE + 5 + 12, i * CELL_SIZE + 5, 3, 18);
        ctx.fillRect(j * CELL_SIZE + 5 + 5, i * CELL_SIZE + 5 + 18, 16, 3);

    },
    clearRect: function(x, y, width, height) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, width, height);
    }
};
