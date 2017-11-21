var enquete = require('./Constant.js')();

module.exports = function () {
    var me = this;

    return {
        listen: function (io) {
            console.log('#### enquete module start listen...');
            //websocket
            io.on('connection', function(socket) {
                socket.on(enquete.create, function(roomId){
                    me.handleCreateRoom(io, roomId);
                    io.emit(enquete.createFinished, {'roomId': roomId});
                });

                socket.on(enquete.join, function(roomId){
                    me.handleJoinRoom(io, roomId);
                    io.emit(enquete.joinFinished, {'roomId': roomId});
                });
            });
        }
    };
};
