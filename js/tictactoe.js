let hordeTurn = true;
let gameArray = ['', '', '', '', '', '', '', '', ''];
let playerOnePoints = 0;
let playerTwoPoints = 0;
let moves = 0;
let winFound = false;

const winCondition = [ // These are all the winning moves
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
    hordeTurn = !hordeTurn; // change turn from Alliance to Horde
}

const checkDraw = function() { //if all cells get filled but there is no winner then its a draw
    moves++;
    if(moves === 9) {
        alert('Draw!');
    }
}

const findWin = function() {
    for (const combination of winCondition) {
        const [a, b, c] = combination;

        if(gameArray[a] && (gameArray[a] === gameArray[b] && gameArray[a] === gameArray[c])) {
            if (hordeTurn) {
                alert("Alliance win!");
                $('#player2-score').addClass('flip');
                playerOnePoints++;
                $('#player2-score').text(playerOnePoints);
                winFound = true; // return to insure you dont get double wins at the last turn
                return;
            } else {
                alert("Horde Win!")
                playerTwoPoints++;
                $('#player1-score').addClass('flip');
                $('#player1-score').text(playerTwoPoints);
                winFound = true;
                return; // return to insure you dont get double wins at the last turn
            }
        }
    }
}

const restart = function() { // remove all the emblems from the cells, reset the counter for moves and if a winner has been found and remove some animations
    $('#reset').on('click', function(){
        gameArray = ['', '', '', '', '', '', '', '', ''];
        $('.cell').removeClass('horde');
        $('.cell').removeClass('alliance');
        $('#player1-score').removeClass('flip');
        $('#player2-score').removeClass('flip');
        winFound = false;
        moves = 0;
    })    
}

$(document).ready(function () {
    //hordeTurn = false;
    restart();

    $('.cell').on('click', function(event) {
        const cell = event.target;
        let parent = $(cell).parent();
        let index = parent.children().index(this);
        if(gameArray[index] !== '') { // Was having some issues with being to put emblems over other emblems if the space was full making scenarios where you could have a draw when the cells werent all full or being able to swap emblems to force a win for a specific faction
            alert('This square is already full'); return;
        }
        gameArray[index] = hordeTurn ? 1 : 2;

        if (hordeTurn) {
            const img = $(this).addClass('horde');
            $(this).attr('src', img);
            swapTurn();
            findWin();
            if (winFound === true) { // Was having issues where if it came down to the last turn and a win was found in the 9th sell then it would call the win, then call a draw and occasionally even call a second win and update the score twice, this removes this problem
                return;
            } else {
               checkDraw(); 
            }
        } 
        else {
            const img = $(this).addClass('alliance');
            $(this).attr('src', img);
            swapTurn();
            findWin();
            if (winFound === true) {
                return;
            } else {
                checkDraw();
            }
        }
    });
});