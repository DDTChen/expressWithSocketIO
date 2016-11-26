var should = require('should');
var io = require('socket.io-client');
    // server = require('../chat-server');

var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};

var constant = require('./../Class/Constant.js')();

describe("Create and Record Course",function(){

    it("Create Course", function(done) {
        var client = io.connect(socketURL, options);

        client.on('connect', function(data){
            client.on(constant.createFinished, function(info) {
                info.should.have.property('roomId').which.is.a.String();
                should.equal(info.roomId, 'room1', 'Room Id is Wrong')
                /* If this client doesn't disconnect it will interfere 
                with the next test */
                client.disconnect();
                done(); 
            });

            client.emit(constant.create, 'room1');
        });
    });

    it("Get Online Course", function(done) {
        var client = io.connect(socketURL, options);

        client.on('connect', function(data){
        
            client.on('ACTION_GET_OPENED_ROOM', function(id) {
                id.should.be.exactly('room1');
                /* If this client doesn't disconnect it will interfere 
                with the next test */
                client.disconnect();
                done(); 
            });

            client.emit('ACTION_GET_OPENED_ROOM');
        });
    });

    it("Join Online Course", function(done) {
        //TODO:
    });
});