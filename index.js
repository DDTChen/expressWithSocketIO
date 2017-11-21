//express
var express = require('express');
var app = express();
var http = require('http').Server(app);
//websocket
var io = require('socket.io')(http);

//classroom manager
var classroom = require('./Class/Classroom.js')().listen(io);

//enquete
var enquete = require('./Enquete/enquete.js')().listen(io);

app.use(express.static('www'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

//----------------
//websocket
// io.on('connection', function(socket) {
//     socket.broadcast.emit('hi');
// });

//----------------

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});