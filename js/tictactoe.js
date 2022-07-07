let hordeTurn = false;
let gameArray = ['', '', '', '', '', '', '', '', ''];
let playerOnePoints = 0;
let playerTwoPoints = 0;
let moves = 0;

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

const checkDraw = function() {
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
            } else {
                alert("Horde Win!")
                playerTwoPoints++;
                $('#player1-score').addClass('flip');
                $('#player1-score').text(playerTwoPoints);
            }
        }
    }
}

const restart = function() {
    $('#reset').on('click', function(){
        gameArray = ['', '', '', '', '', '', '', '', ''];
        $('.cell').removeClass('horde');
        $('.cell').removeClass('alliance');
        $('#player1-score').removeClass('flip');
        $('#player2-score').removeClass('flip');
        moves = 0;
    })    
}

$(document).ready(function () {
    hordeTurn = false;
    restart();
    //egg();

    $('.cell').on('click', function(event) {
        const cell = event.target;
        let parent = $(cell).parent();
        let index = parent.children().index(this);

        gameArray[index] = hordeTurn ? 1 : 2;
        console.log(moves);
        
        if (hordeTurn) {
            const img = $(this).addClass('horde');
            $(this).attr('src', img);
            swapTurn();
            findWin();
            checkDraw();
            //$('#player1-score').removeClass('flip');
        } 
        else {
            const img = $(this).addClass('alliance');
            $(this).attr('src', img);
            swapTurn();
            findWin();     
            checkDraw();   
            //$('#player2-score').removeClass('flip');    
        } 
    });
});

// const egg = function() {
//     $('body').keypress(function(e) {
//         if(e.keyCode == 32 && e.keyCode == 32) {
//             console.log('space bar is pressed');
//         }
//     });
// }