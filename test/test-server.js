var should = require('should');
var io = require('socket.io-client');
    // server = require('../chat-server');

var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};
describe("Socket.IO Server",function(){

    it("Create Course", function(done) {
        var client = io.connect(socketURL, options);

        client.on('connect', function(data){
        
            client.on('ACTION_USER_CREATE_ROOM', function(id) {
                id.should.be.type('string');

                /* If this client doesn't disconnect it will interfere 
                with the next test */
                client.disconnect();
                done(); 
            });

            client.emit('ACTION_USER_CREATE_ROOM', 'chatUser1');
        });
    });
});