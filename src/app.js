var cards = ['../images/tom-cat.png','../images/tom-cat.png','../images/winnie-pooth.jpg','../images/winnie-pooth.jpg','../images/porky-pig.png','../images/porky-pig.png','../images/mickey-mouse.png','../images/mickey-mouse.png','../images/jerry-mouse.png','../images/jerry-mouse.png','../images/bugs-bunny.png','../images/bugs-bunny.png','../images/tweety.png','../images/tweety.png','../images/bart-simpson.png','../images/bart-simpson.png'];
var memoryValues = [];
var memoryTileIds = [];
var tilesFlipped = 0;
Array.prototype.shuffleCards = function(){
    var i=this.length,j,temp;
    while(--i > 0){
        j=Math.floor(Math.random()*(i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//console.log(cards.shuffleCards(),cards);

function newBoard(){
    tilesFlipped = 0;
    var output = '';
    cards.shuffleCards();
    console.log(cards);
    for (var i = 0; i < cards.length; i++) {
        output += '<div id="tile_'+i+'" onclick = "memoryFlipTile(this,\''+cards[i]+'\')"></div>';
    }
    document.getElementById('gameBoard').innerHTML = output;
}

function memoryFlipTile(tile,val){
    console.log("I Am In",tile, val);
    
    if(tile.innerHTML =="" && memoryValues.length<2){
        tile.style.background = 'url('+val+') no-repeat';

        if(memoryValues.length == 0){
            memoryValues.push(val);          
            memoryTileIds.push(tile.id);            
        }
        
        else if(memoryValues.length == 1){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
        
            if(memoryValues[0] == memoryValues[1]){
                tilesFlipped += 2;
                //clear both ararys
                memoryValues =[];
                memoryTileIds =[];
                //check to see if whole board is cleared
        
                if(tilesFlipped == cards.length){
                    alert("board cleared ... generating new board"),
                    document.getElementById('gameBoard').innerHTML="";
                    newBoard();
                }
            }
           
            else{
                function flipToBack(){
                    //flip the 2 tiles back over
                    var tile_1 = document.getElementById(memoryTileIds[0]);
                    var tile_2 = document.getElementById(memoryTileIds[1]);
                    tile_1.style.background = 'url(../images/thinking-emoji.jpeg) no-repeat';
                    tile_1.innerHTML = '';
                    tile_2.style.background = 'url(../images/thinking-emoji.jpeg) no-repeat';
                    tile_2.innerHTML = '';
                    //clear both ararys
                    memoryValues =[];
                    memoryTileIds =[];
                }
                setTimeout(flipToBack,700);
            }
        }
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    newBoard();
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};