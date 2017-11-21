var should = require('should');

var classroom = require('./../Class/Storage.js')();

describe("Store Course Info test: ",function(){

    it("Set Course Info", function(done) {
        var object = {};
            object.id = 'iamroomid';
            object.teacherId = 'test-teacher';
            object.studentList = ['A', 'B', 'C'];
            object.connectedStudents = ['A', 'B'];
            object.actionType = 'exam';
            object.actionData = 'exam1';
        classroom.initClassInfo(
            object.id, 
            object.teacherId, 
            object.studentList,
            function (error, result) {
                should.not.exist(error);
                should.exist(result);
                result.should.equal('OK');
                done();
            });
    });
                // public function getId() {
        // public function isCreator($username) {
        // public function getCreator() {
	    // public function getConnectedStudents() {
        // public function getConnectedStudentNames() {
    	// public function setConnectedStudent(ConnectedClientInterface $client) {
        // public function setQuestion($question) {
	    // public function getCurrentQuestion($username) {
	    // public function closeQuestion() {
        // public function addRepliedStudents($username) {
});