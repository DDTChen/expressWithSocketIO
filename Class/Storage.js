// var redisClient = require('redis-connection')();
var redis = require("redis"),
    redisClient = redis.createClient();


module.exports = function () {
    return {
        initClassInfo: function (roomId, teacherId, studentList, callback) {
            redisClient.hmset(
                'roomId-'+roomId, 
                'teacherId', teacherId, 
                'studentList', JSON.stringify(studentList), 
                callback
            );
        },
        setJoinStudent: function(roomId, stuSocketId, callback) {
            redisClient.hget('roomId-'+roomId, 'studentList', function(error, result) {
                var stuList = JSON.parse(result);
                if (!Array.isArray(stuList)) {
                    return callback();
                } 
                stuList.push();
            });
        },
        // setTeacher: function(roomId, teacherSocketId, callback) {
        //     redisClient.hset('roomId-'+roomId, 'teacherId', function(error, result) {
        //         return callback(result);
        //     });
        // },
        getTeacher: function(roomId, callback) {
            redisClient.hget('roomId-'+roomId, 'teacherId', function(error, result) {
                return callback(result);
            });
        },
        relativeIdAndName: function(socketId, username) {
            redisClient.set(
                socketId, username, redis.print
            );
        },
        getUserNamebyId: function (socketId, callback) {
            redisClient.get(socketId, function(error, result) {
                callback(null,
                    {student_id: socketId, student_name: result}
                );
            });
        },
        getAllClassId: function (callback) {
            redisClient.KEYS('roomId-*', function (err, results) {
                return callback(
                    results.map(function(id){
                        return id.replace('roomId-', '');
                    })
                );
            });
        },
        setAction: function(roomId, actionType, data, target) {
            redisClient.hmset(
                'roomId-'+roomId, 
                'actionType', actionType, 
                'actionData', JSON.stringify(data), 
                callback
            );        
        }



        // public function getConnectedStudentNames() {
    	// public function setConnectedStudent(ConnectedClientInterface $client) {
        // public function setQuestion($question) {
	    // public function getCurrentQuestion($username) {
	    // public function closeQuestion() {
        // public function addRepliedStudents($username) {
    };
};