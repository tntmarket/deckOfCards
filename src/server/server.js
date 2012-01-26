var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});
requirejs(['express', 'socket.io'],
function (express, sio) {
    
    var port = process.env.PORT || 3000;
    
    //set up http server + serve index view
    var app = express.createServer();
    conf = function(path) {
        console.log(path);
        app.use(express.logger());
        app.use(express.static(path));
        app.use(express.favicon(path + '/favicon.ico'));
        app.set('views', path);
    }
    app.configure('development', function() {
        console.log('dev');
        conf(__dirname + '/../site');
    });
    
    app.configure('production', function() {
        console.log('prod');
        conf(__dirname + '/../build');
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
        io.enable('browser client minification');
        io.enable('browser client etag');
        io.enable('browser client gzip');
        io.set('log level', 1);
    });
    
    io.configure(function() {
        io.set("transports", ["xhr-polling"]); 
        io.set("polling duration", 10); 
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
