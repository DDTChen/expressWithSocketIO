var fetch = require('node-fetch');
var querystring = require('querystring')

var classroom = require('./Constant.js')();

module.exports = function () {
    return {
        fetchStudentCurrentCourse: function (username, cid, ticket, callback) {
            var queryData = {
                    action: 'get-current-course',
                    ticket: ticket,
                    cid: cid,
                    username: username
                };

            fetch(classroom.HONGU_LMS_HOST + '/xmlapi/index.php' + '?' + querystring.stringify(queryData))
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                callback(json);
            });
        }
    }
};