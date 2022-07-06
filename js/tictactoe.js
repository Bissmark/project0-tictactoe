let hordeTurn = false;
let gameArray = ['', '', '', '', '', '', '', '', ''];
let playerOnePoints = 0;
let playerTwoPoints = 0;
let currentPlayer = 0;

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const swapTurn = function() {
    hordeTurn = !hordeTurn;
}

const findWin = function() {
    for (const combination of winCondition) {
        const [a, b, c] = combination;

        if(gameArray[a] && (gameArray[a] === gameArray[b] && gameArray[a] === gameArray[c])) {
            alert("WINNER!");
            //return combination;
        }
    }
    return null;
}

const restart = function() {
    $('#reset').on('click', function(){
        //location.reload();
        gameArray = ['', '', '', '', '', '', '', '', ''];
        $('.cell').removeClass('horde');
        $('.cell').removeClass('alliance');
    })    
}

const checkWinner = function(score) {
    $('.player1 p').text += score;
    $('.player2 p').text += score;
}

$(document).ready(function () {
    hordeTurn = false;
    restart();

    $('.cell').on('click', function(event) {
        const cell = event.target;
        var parent = $(cell).parent();
        var index = parent.children().index(this);

        gameArray[index] = hordeTurn ? 1 : 2;
        
        if (hordeTurn) {
            const img = $(this).addClass('horde');
            $(this).attr('src', img);
            swapTurn();
            currentPlayer = 1;
            findWin();
        } 
        else {
            const img = $(this).addClass('alliance');
            $(this).attr('src', img);
            swapTurn();
            currentPlayer = 0;
            findWin();            
        } 
    });
});