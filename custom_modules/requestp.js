var request = require('request');
var Promise = require('promise');

//@TODO:  Stop using request, since it's deprecated on npm

module.exports = function (options, data) {
  data = data || false;
  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      if(err) {
        return reject(err);
      }else if(res.statusCode !== 200) {
        err = new Error('Unexpected status code: ' + res.statusCode);
        err.res = res;
        return reject(err);
      }else{
        resolve(body);
      }
    });
  });
}
