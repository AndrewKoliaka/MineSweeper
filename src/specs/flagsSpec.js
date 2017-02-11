describe('flags suite', function() {
    beforeEach(function() {
        battlefield.fill();
        flags._flags = [];
        flags.foundBombs = 0;
        var div = document.createElement('div');
        div.setAttribute('id', 'foundBmb');
        var child = document.createElement('div');
        div.appendChild(child);
        document.body.appendChild(div);
    });

    it('should set flag', function() {
        flags.setFlag(0, 0);
        expect(battlefield.getCell(0, 0)).toEqual('f');
        expect(flags.foundBombs).toEqual(1);
        expect(flags._flags.length).toEqual(1);
    });

    it('should not set flag', function() {
        battlefield.setCell(0, 0, 'v');
        flags.setFlag(0, 0);
        expect(flags.foundBombs).toEqual(0);
        expect(flags._flags.length).toEqual(0);
        expect(battlefield.getCell(0, 0)).toEqual('v');
    });

    it('should remove flag', function() {
        flags.setFlag(0, 0);
        flags.removeFlag(0, 0);
        expect(flags.foundBombs).toEqual(0);
        expect(flags._flags.length).toEqual(0);
        expect(battlefield.getCell(0, 0)).not.toEqual('f')
    });
});
