var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});
requirejs(['express', 'socket.io'],
function (express, sio) {
    
    var port = process.env.PORT || 3000;
    
    //set up http server + serve index view
    var app = express.createServer();
    app.configure(function() {
        var staticPath = __dirname + '/../site';
        app.use(express.logger());
        app.use(express.static(staticPath));
        app.use(express.favicon(staticPath + '/favicon.ico'));
        app.set('views', staticPath);
    });
    
    app.listen(port, function() {
        console.log('on port ' + port);
    });
    
    app.get('/', function(req, res) {
        res.render('index.jade', { layout: false });
    });
    
    
    //set up http server + serve index view
    var io = sio.listen(app);
    
    io.configure('production', function() {
        io.set('browser client minification', true);
    });
    
    io.sockets.on('connection', function (socket) {
    /*  socket.emit('toClient', { msg: 'hello client, from the server' });
        socket.on('toServer', function (data) {
            console.log(data);
        });*/
        socket.emit('spawnDeck', { data: 'data about the new deck' })
        socket.on('drawCard', function (data) {
            socket.emit('getCard', { data: 'data about the card drawn' });
            console.log(data);
        });
    });
    
});