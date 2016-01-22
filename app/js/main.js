'use strict';
const ROWS = 8,
      COLS = 8,
      SIZE = 30; //+ 2 px for border
var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d');

window.addEventListener('load', init, false);
//window.onload = init;

function init(){
    canvas.addEventListener('click', elClicked,false);
    battlefield.fill();
    battlefield.setBombs();
    battlefield.setHints();
    view.drawCanvas();
}
      
var battlefield = {
    _playground : [],
    numBombs : 10,
    fill : function() {
       for(var i = 0; i < COLS; i++){
           this._playground[i] = [];
           for(var j = 0; j < ROWS; j++){
               this._playground[i][j] = 0;
           }
       }
    },
    getCell : function(i , j) {
        return this._playground[i][j]
    },
    setBombs : function(){
        var bombs = 0,
            randI, randJ;
       while (bombs < this.numBombs) {
           randI = Math.floor(Math.random() * this._playground.length);
           randJ = Math.floor(Math.random() * this._playground.length);
           if(!this._playground[randI][randJ]){
               this._playground[randI][randJ] = '*';
               bombs++;
           }
       }
    },
    setHints : function(){
        var bombcounter = 0;
        for(var i = 0; i < COLS; i++){
            for(var j = 0; j < ROWS; j++){
                if(this._playground[i][j] === "*"){
                    continue;
                }
               for(var c = 1; c > -2; c--){
                   for(var r = 1; r > -2; r--){
                       if(i - c < 0 || j - r < 0 || i - c > ROWS - 1 || j - r > COLS - 1){
                           continue;
                       }
                       if(this._playground[i-c][j-r] === '*'){
                           bombcounter++;
                       }
                   }
               }
               this._playground[i][j] = bombcounter;
               bombcounter = 0;
            }
        }
        var arr = '';
        for(var i = 0; i < COLS; i++){
           for(var j = 0; j < ROWS; j++){
               arr += " " + this._playground[i][j];
           }
           arr += '\n';
       }
       console.log(arr);
    },
    verify : function(i, j){
       
        if(this.getCell(i,j) === 0){
            view.open(i,j,this._playground[i][j]);
            
        }
        
      
       
    }
}

var view = {
    open : function(i , j, symbol) {
        switch (symbol){
            case 0 :
                    ctx.fillStyle = '#C7DCED';
                    ctx.fillRect(i * SIZE + 1, j * SIZE + 1, SIZE -2 , SIZE -2 ); break;
            case '*' :
                    ctx.fillStyle = '#fdafa1';
                    ctx.fillRect(i * SIZE + 1, j * SIZE + 1, SIZE -2 , SIZE -2 );
                    ctx.fillStyle = 'black';
                    ctx.font = '40px Arial';
                    ctx.fillText("*",i * SIZE + SIZE/6, j * SIZE + SIZE + SIZE/5);break;
            default : 
                    ctx.fillStyle = '#ece3b0';
                    ctx.fillRect(i * SIZE + 1, j * SIZE + 1, SIZE -2 , SIZE -2 );
                    ctx.fillStyle = 'black';
                    ctx.font = '20px Arial';
                    ctx.fillText(symbol,i * SIZE + SIZE/3, j * SIZE + SIZE - SIZE/3);
        }
                
        },
    drawCanvas : function(){
        ctx.beginPath();
        
        for(var i = 0; i < COLS; i++){
           for(var j = 0; j < ROWS; j++){
                ctx.strokeRect(j*SIZE, i * SIZE,SIZE, SIZE);
           }
       }
       ctx.stroke();
        
    }
}


function elClicked(e){
    battlefield.verify(Math.floor(e.offsetX/SIZE) , Math.floor(e.offsetY/SIZE));
}

/*function checkArr(arr, j){
            var rezArr = [],
                leftIndx = j, rightIndx = j,
                leftVal , rightVal;
            while(!leftVal && !rightVal){
                if(rightIndx < arr.length - 1 && !rightVal){
                    
                    if(arr[rightIndx] > 0){
                        console.log('rightIndex : '+ rightIndx);
                        rezArr.push(rightIndx);
                        rightVal = true;
                    } else 
                        rezArr.push(rightIndx);
                        rightIndx++;
                } else {
                    rightVal = true;
                }
                
                if(leftIndx > 0 && !leftVal){
                    
                    if(arr[leftIndx] > 0){
                        console.log('leftIndex : '+ leftIndx);
                        rezArr.push(leftIndx);
                        leftVal = true;
                    } else 
                        rezArr.push(leftIndx);
                        leftIndx--;
                } else {
                    leftVal = true;
                }
            }
            
            return rezArr;
        }*/
        
        