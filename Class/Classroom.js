// var redis = require('redis'),
//     RDS_PORT = 32768,        //端口号
//     RDS_HOST = '192.168.99.100',    //服务器IP
//     RDS_OPTS = {},            //设置项
//     redisClient = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

var constant = require('./Constant.js')();

module.exports = function () {
    var me = this;

    me.handleCreateRoom = function(roomId) {
        console.log('#### handleCreateRoom called');
    };

    me.handleJoinRoom = function(roomId) {
        console.log('#### handleJoinRoom called');
    };

    return {
        listen: function (io) {
            console.log('#### class module start listen...');
            console.log(me.handleCreateRoom);
            //websocket
            io.on('connection', function(socket) {
                socket.on(constant.create, function(roomId){
                    //
                    me.handleCreateRoom(roomId);
                    io.emit(constant.createFinished, {'roomId': roomId});
                });

                socket.on(constant.join, function(roomId){
                    me.handleJoinRoom(roomId);
                    io.emit(constant.joinFinished, {'roomId': roomId});
                });
            });
        }
    };
};
