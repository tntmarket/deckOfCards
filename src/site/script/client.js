$(function() {
    var socket = io.connect('http://localhost');
    var card, deck;
    
    socket.emit('drawCard');
    
    socket.on('getCard', function(data) {
        card = data;
        console.log(data);
    });

    socket.on('spawnDeck', function(data) {
        deck = data;
        console.log(data);
    });
});