var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};

var classroom = require('./../Class/Constant.js')();

describe("About Course: ",function(){

    it("Create Course", function(done) {
        var client = io.connect(socketURL, options);

        client.on('connect', function(data){
            client.on(classroom.createFinished, function(info) {
                info.should.have.property('roomId').which.is.a.String();
                should.equal(info.roomId, 'room1', 'Room Id is Wrong')
                /* If this client doesn't disconnect it will interfere 
                with the next test */
                client.disconnect();
                done(); 
            });

            client.emit(classroom.create, {id: 'room1', userName: 'teacher1', ticket:'f87c3e0c1261f042d0dc45c3a5c52a45'});
        });
    });

    it("Get Online Course", function(done) {
        var client = io.connect(socketURL, options);

        client.on('connect', function(data) {
            client.on(classroom.listClassRoom, function(info) {
                info.should.be.an.Array();
                info.should.containEql('room1');
                /* If this client doesn't disconnect it will interfere 
                with the next test */
                client.disconnect();
                done(); 
            });

            client.emit(classroom.listClassRoom, {username: 'teacher1', ticket:'f87c3e0c1261f042d0dc45c3a5c52a45'});
        });
    });

    it("Join Online Course", function(done) {
        var client = io.connect(socketURL, options);
        client.on('connect', function(data) {
            client.on(classroom.joinFinished, function(info) {
                //TODO:
                info.should.have.property('roomId').which.is.a.String();
                should.equal(info.roomId, 'room1');
                client.disconnect();
                done(); 
            });

            client.emit(classroom.join, {userName: 'stu1', roomId: 'room1'});
        });
    });

    it("List Online Course Student", function(done) {
        var client = io.connect(socketURL, options);
        client.on('connect', function(data) {
            client.on(classroom.listStudent, function(data) {
                data.should.be.an.Array().with.lengthOf(1);
                data.should.have.a.lengthOf(1);
                //TODO:
                data[0].should.have.property('student_id').which.is.a.String();
                data[0].should.have.property('student_name').which.is.a.String();
                
                data[0].student_name.should.be.equal('stu1');
                client.disconnect();
                done(); 
            });

            client.emit(classroom.join, {username: 'stu1', roomId: 'room1'});
            client.emit(classroom.listStudent, 'room1');
        });
    });
});