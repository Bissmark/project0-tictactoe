let hordeTurn;
const playerTurn = ['hordeTurn', 'allianceTurn'];

const swapTurn = function() {
    hordeTurn = !hordeTurn;
}

$(document).ready(function () {
    $('.cell').on('click', function() {
        console.log('cell clicked');

        if (hordeTurn) {
            const img = $(this).addClass('horde');
            $(this).attr('src', img);
            swapTurn();
        } 
        else {
            const img = $(this).addClass('alliance');
            $(this).attr('src', img);
            swapTurn();
        } 
    });
});