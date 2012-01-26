$(function() {
    var socket = io.connect('http://localhost');

    socket.emit('drawCard');

    socket.on('getCard', function(data) {
        console.log(data);
    });

    socket.on('spawnDeck', function(data) {
        console.log(data);
    });
});