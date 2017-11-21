var classroomEvent = require('./Constant.js')();
var storage = require('./Storage.js')();
var fetcher = require('./ClassInfoFetch.js')();
var classroom = require('./Classroom.js')();
// var async = require("async");

module.exports = function (enquete) {
    var me = this;
    var sockets = [];

    me.handleCreateRoom = function(roomId, teacherId, ticket, callback) {
        //set data to DB
        storage.initClassInfo(
            roomId, 
            teacherId, 
            [], 
            callback
        ); 
    };

    me.handleJoinRoom = function(socket, roomId) {
        //use socket.io to join
        socket.join(roomId);
    };

    // me.getAllClientinClass = function (io, roomId, callback) {
    //     io.in(roomId).clients(function(error, clients) {
    //         if (error) {
    //             callback(error, null);
    //         } else {
    //             async.map(
    //                 clients, 
    //                 storage.getUserNamebyId, 
    //                 function(error, results) {
    //                     callback(error, results);
    //                 }
    //             );
    //         }
    //     });
    // };

    me.getAllClientinClass = function (io, roomId, callback) {
        io.in(roomId).clients(callback);
    };

    // me.getStudentAvailableCourse = function (username, ticket, callback) {
    //     storage.getAllClassId(callback);
    // };
    me.getAvailableCourse = function (username, ticket, callback) {
        return io.nsps['/'].adapter.rooms;
    };

    return {
        listen: function (io) {
            io.on('connection', function(socket) {
                /*
                 * 新增課程
                 * @param roomInfo.id 
                 * @param roomInfo.userName
                 */
                socket.on(classroom.create, function(roomInfo){
                    console.log('#### classroom.create');
                    console.log(JSON.stringify(roomInfo));
                    socket.join(roomInfo.id);
                    socket.emit(
                        classroomEvent.createFinished, 
                        {'roomId': roomInfo.id}
                    );

                    socket.emit(
                        classroomEvent.listRoom, 
                        {'roomId': roomInfo.id}
                    );
                });
                /*
                 * 加入課程
                 * @param roomInfo.userName 
                 * @param roomInfo.roomId
                 */
                socket.on(classroomEvent.join, function(userInfo) {
                    // storage.relativeIdAndName(socket.id, userInfo.userName);
                    //use socket.io to join
                    socket.join(
                        userInfo.roomId, 
                        function () {
                            sockets[socket.id] = userInfo.userName;

                            //emit to student
                            socket.emit(classroomEvent.join, {'roomId': userInfo.roomId});

                            io.to(userInfo.roomId).emit(classroomEvent.listStudent, list);
                        });

                    //emit list-stu event to teacher
                    // storage.getTeacher(userInfo.roomId, function (teacherId) {
                    //     me.getAllClientinClass(
                    //         io, 
                    //         userInfo.roomId,
                    //         function (error, list) {
                    //             io.to(teacherId).emit(classroom.listStudent, list);
                    //         });
                    // });
                });

                /*
                 * leave課程
                 * @param roomInfo.userName 
                 * @param roomInfo.roomId
                 */
                socket.on(classroomEvent.leave, function(userInfo) {
                    // storage.relativeIdAndName(socket.id, userInfo.userName);
                    //use socket.io to join
                    socket.leave(
                        userInfo.roomId,
                        function () {
                            //emit to student
                            socket.emit(classroomEvent.join, {'roomId': userInfo.roomId});

                            io.to(userInfo.roomId).emit(classroomEvent.listStudent, list);
                        });

                    //emit list-stu event to teacher
                    // storage.getTeacher(userInfo.roomId, function (teacherId) {
                    //     me.getAllClientinClass(
                    //         io, 
                    //         userInfo.roomId,
                    //         function (error, list) {
                    //             io.to(teacherId).emit(classroom.listStudent, list);
                    //         });
                    // });
                });

                /*
                 * 
                 * @param roomInfo.userName 
                 * @param roomInfo.roomId
                 */
                socket.on(classroomEvent.listStudent, function(roomId){
                    io.clients(function(error, clients){
                        if (error) throw error;
                        var list = clients.map(function(client) { 
                            return sockets[client.id];
                        });
                        socket.emit(classroomEvent.listStudent, list);
                    });
                });

                // TODO: to student
                // userInfo.userName 
                // userInfo.ticket 
                socket.on(classroomEvent.listClassRoom, function(userInfo) {
                    me.getAvailableCourse(
                        userInfo.userName,
                        userInfo.ticket,
                        function (list) {
                            console.log('#### classroom.listClassRoom');
                            console.log(list);
                            socket.emit(classroomEvent.listClassRoom, list);
                        }
                    );
                });
            });
        }
    };
};
