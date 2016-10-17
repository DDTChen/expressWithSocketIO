var express = require('express');
var app = express();
var http = require('http').Server(app);

//websocket
var io = require('socket.io')(http);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

//websocket
io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});