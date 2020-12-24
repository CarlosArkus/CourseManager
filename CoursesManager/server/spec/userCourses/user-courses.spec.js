const request = require('request');

const endpoint = 'http://localhost:3000/api/courses/list';

describe("Get user courses", function () {
  it("should return 200 response code", function (done) {
    request.get(endpoint, function (err, response) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});