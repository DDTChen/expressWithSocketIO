//redis
// var pub = require('redis-connection')();
// var sub = require('redis-connection')('subscriber');

// exports 2 methods for other modules or files to use
var Classroom = {
  create: function( path, callback ){
    console.log('Classroom.create called');
  },
 
  join: function() {
    // print out the data
    console.log( 'Classroom.join called' );
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