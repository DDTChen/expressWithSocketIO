//redis
// var pub = require('redis-connection')();
// var sub = require('redis-connection')('subscriber');
var redis = require('redis'),
    RDS_PORT = 32768,        //端口号
    RDS_HOST = '192.168.99.100',    //服务器IP
    RDS_OPTS = {},            //设置项
    redisClient = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

// exports 2 methods for other modules or files to use
var Classroom = {
  create: function(id, callback){
    console.log('Classroom.create called');
    redisClient.set('roomList', id, redis.print);
    callback();
  },
 
  join: function(id, callback) {
    // print out the data
    console.log('Classroom.join called');
    
  },

  getOnlineCourse: function(callback) {
    redisClient.get('roomList', function (err, result) {
      console.log('hello ', result.toString()); // hello world
      callback(err, result);
    });
  },

  leave: function() {
    // print out the data
    console.log( 'Classroom.leave called' );
  },

	getConnectedStudents: function () {
	},

  getConnectedStudentNames: function () {
  },

  closeQuestion: function () {
  },

  addRepliedStudents: function () {
  },

  setStudentList: function setStudentList() {
  },

  getStudentList: function getStudentList() {
  },

  inStudentList: function inStudentList($studentId) {
  },

	setConnectedStudent: function setConnectedStudent() {
	},

	unsetConnectedStudent: function () {
	},

	setQuestion: function () {
	},

	getCurrentQuestionId: function () {
	}
};

module.exports = Classroom;