const request = require('request');

const endpoint = 'http://localhost:3000/api/auth/signin';

const user = {
  "email": "cdelarosa@arkusnexus.com",
  "password": "123456"
}

describe("Auth", function () {
  it("should return 200 response code", function (done) {
    request.post(endpoint, {
      json: true, body: {
        email: "cdelarosa@arkusnexus.com",
        password: "123456"
      }
    }, function (err, response) {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});