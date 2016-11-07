//express
var express = require('express');
var app = express();
var http = require('http').Server(app);

//redis
// var redis = require('redis');
// redis.create();

//websocket
var io = require('socket.io')(http);

//classroom manager
var classroom = require('./Classroom.js');

app.use(express.static('www'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

//----------------
var ACTION_USER_CREATE_ROOM = 'ACTION_USER_CREATE_ROOM';
var ACTION_USER_CREATE_ROOM_COMPLETE = 'ACTION_USER_CREATE_ROOM_COMPLETE';

var ACTION_USER_JOIN_ROOM = 'ACTION_USER_JOIN_ROOM';
var ACTION_USER_JOIN_ROOM_COMPLETE = 'ACTION_USER_JOIN_ROOM_COMPLETE';

var ACTION_GET_OPENED_ROOM = 'ACTION_GET_OPENED_ROOM';

var ACTION_QUESTIONNAIRE_CREATE = 'ACTION_QUESTIONNAIRE_CREATE';

var ACTION_GET_CURRENT_QUESTIONNAIRE = 'ACTION_GET_CURRENT_QUESTIONNAIRE';

var ACTION_QUESTIONNAIRE_CLOSE = 'ACTION_QUESTIONNAIRE_CLOSE';

var ACTION_QUESTIONNAIRE_ANSWER = 'ACTION_QUESTIONNAIRE_ANSWER';
//----------------

//websocket
io.on('connection', function(socket) {
    console.log('a user connected and server say hi');
    socket.broadcast.emit('hi');

//---------------
    socket.on(ACTION_USER_CREATE_ROOM, function(roomId){
        socket.join(roomId);
        io.emit(ACTION_USER_CREATE_ROOM_COMPLETE, {'roomId': roomId});
    });

    socket.on(ACTION_USER_JOIN_ROOM, function(roomId){
        socket.join(roomId);
        io.emit(ACTION_USER_JOIN_ROOM, {'roomId': roomId});
    });
//---------------

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('echo message', function(msg){
        console.log('echo: ' + msg);
    });

    socket.on(ACTION_USER_CREATE_ROOM, function(id){
        console.log('create: ' + id);
        
        socket.join(id);
        classroom.create();

        io.emit(ACTION_USER_CREATE_ROOM, id);
    });

    socket.on(ACTION_USER_JOIN_ROOM, function(id){
        console.log('join: ' + id);

        socket.join(id);
        classroom.join();

        io.emit(ACTION_USER_JOIN_ROOM, id);
    });

    socket.on(ACTION_GET_OPENED_ROOM, function(){
        console.log('ACTION_GET_OPENED_ROOM');

        io.emit(ACTION_USER_JOIN_ROOM, id);
    });

    socket.on(ACTION_QUESTIONNAIRE_CREATE, function(id){
        console.log('ACTION_QUESTIONNAIRE_CREATE: ' + id);
    });

    //ACTION_GET_CURRENT_QUESTIONNAIRE
    socket.on(ACTION_GET_CURRENT_QUESTIONNAIRE, function(id){
        console.log('ACTION_GET_CURRENT_QUESTIONNAIRE: ' + id);
    });

    //ACTION_QUESTIONNAIRE_CLOSE
    socket.on(ACTION_QUESTIONNAIRE_CLOSE, function(id){
        console.log('ACTION_QUESTIONNAIRE_CLOSE: ' + id);
    });

    //ACTION_QUESTIONNAIRE_ANSWER
    socket.on(ACTION_QUESTIONNAIRE_ANSWER, function(id){
        console.log('ACTION_QUESTIONNAIRE_ANSWER: ' + id);
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