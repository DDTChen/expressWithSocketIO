var should = require('should');

var classroom = require('./../Class/ClassInfoFetch.js')();

describe("Test fetch class info: ",function(){

    it("fetchClassStudentList", function(done) {
        classroom.fetchClassStudentList('10000001', '906f373bcfd1d6963d33e434c3730ec8', function(result) {
            result.data.list.should.be.an.Array();
            done();
        });
    });

    it("fetchStudentCurrentCourse", function(done) {
        classroom.fetchStudentCurrentCourse('spring', '10000123', '906f373bcfd1d6963d33e434c3730ec8', function(result) {
            // console.log(result);
            result.data.list.should.be.an.Array();
            done();
        });
    });
});