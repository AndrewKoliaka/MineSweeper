describe('battlefield suite', function() {
    beforeEach(function() {
        battlefield.fill();
    });

    beforeAll(function() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        spyOn(view, 'open');
    });

    it('should start', function() {
        expect(battlefield.numMines).toEqual(10);
        expect(battlefield._playground.length).toEqual(8);
        expect(battlefield._gameFinished).toBeFalsy();
    });

    it('should set value for cell', function() {
        battlefield.setCell(0, 0, 15);
        expect(battlefield.getCell(0, 0)).toEqual(15);
    });

    it('should verify', function() {

        spyOn(battlefield, 'gameOver');
        spyOn(flags, 'removeFlag');

        battlefield.setCell(0, 0, '*');
        battlefield.verify(0, 0);
        expect(battlefield.gameOver).toHaveBeenCalled();
        expect(view.open).toHaveBeenCalledWith(0, 0, '*');
        battlefield.setCell(0, 0, 'f');
        battlefield.verify(0, 0);
        expect(flags.removeFlag).toHaveBeenCalledWith(0, 0);
        battlefield.setCell(0, 0, 15);
        battlefield.verify(0, 0);
        expect(view.open).toHaveBeenCalledWith(0, 0, 15);
    });

    it('should set hint', function() {
        battlefield.setCell(1, 1, '*');
        battlefield.setHints();
        expect(battlefield.getCell(0, 0)).toEqual(1);
        expect(battlefield.getCell(5, 5)).toBeFalsy();

    });

    it('should set bigger bomb count', function() {
        battlefield.setCell(0, 0, '*');
        battlefield.setCell(0, 1, '*');
        battlefield.setCell(0, 2, '*');
        battlefield.setHints();
        expect(battlefield.getCell(1, 0)).toEqual(2);
        expect(battlefield.getCell(1, 1)).toEqual(3);
    });

    it('should checkWin', function() {
        battlefield.checkWin();
        expect(battlefield._gameFinished).toBeFalsy();
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                battlefield.setCell(i, j, 'f')
            }
        }
        battlefield.checkWin();
        expect(battlefield._gameFinished).toBeFalsy();
    });
});
