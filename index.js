var express = require('express');
var app = express();
var http = require('http').Server(app);

//websocket
var io = require('socket.io')(http);

app.use(express.static('www'));
app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/www/index.html');
});

//websocket
io.on('connection', function(socket) {
    console.log('a user connected and server say hi');
    socket.broadcast.emit('hi');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('echo message', function(msg){
        console.log('echo: ' + msg);
    });
    socket.on('join', function(id){
        console.log('join: ' + id);
        socket.join(id);
        io.emit('join', id);
    });
    socket.on('leave', function(id){
        console.log('leave: ' + id);
        socket.leave(id);
    });
    socket.on('ask question', function(roomId, qid){
        console.log('ask question: ' + roomId + ' ' + qid);
        socket.broadcast.to(roomId).emit('ask question', qid);
    });
    socket.on('answer complete', function(roomId){
        console.log('answer complete: ' + id);
        socket.broadcast.to(roomId).emit('answer complete', qid);
    });

    socket.on('chat message', function(message){
        console.log('chat message: ' + message);
        io.emit('chat message echo', message);
    });
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});