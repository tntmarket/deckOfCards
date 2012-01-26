$(function() {
    var socket = io.connect('http://localhost');
    var card, deck;
    
    $('#main').click(function() {
        socket.emit('drawCard');
    });
    
    socket.on('getCard', function(data) {
        card = data;
        console.log(data);
        $('#main').append('GOT A CARD..... ');
    });

    socket.on('spawnDeck', function(data) {
        deck = data;
        console.log(data);
        $('#main').append('ITS A DECK..... ');
    });
});