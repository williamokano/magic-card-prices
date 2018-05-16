var request = require('request');
var Promise = require('promise');
var requestp = require('./requestp');

var request_options = {
  headers: {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  }
};

//Simple prototype function
Date.prototype.yesterday = function() {
  var newDate = new Date(this.getTime());
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}

Date.prototype.toDBString = function() {
  return this.toISOString().slice(0, 10);
}

//Make the proxy request
var today = new Date();
var yesterday = today.yesterday();
var proxy_list = [];

var request_proxy = function(date, proxy_list_result) {
  request_options["url"] = "http://checkerproxy.net/api/archive/" + date.toDBString();
  request_options["json"] = true;
  console.log(request_options["url"]);
  return requestp(request_options).then(function(proxy_list_resp) {
    for (var i = 0; i < proxy_list_resp.length; i++) {
      if (proxy_list_resp[i].ip_geo_country == "Brazil" && proxy_list_resp[i].timeout <= 5000) {
        proxy_list_result.push(proxy_list_resp[i].addr);
      }
    }
  }, function(err) {
    console.log("ERR getting proxy for " + date.toDBString() + " : " + err);
  });
}

module.exports = {
  get : function(get_callback) {
    proxy_list = [];

    return Promise.all([request_proxy(yesterday, proxy_list), request_proxy(today, proxy_list)]).then(function() {
      get_callback(proxy_list);
    });
  }
}
