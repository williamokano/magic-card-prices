var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');
var requestp = require('./requestp');
var proxy_list = [];

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

module.exports = {
  get : function(get_callback) {
    request_options["url"] = "http://checkerproxy.net/getProxy?date=" + yesterday.toDBString();
    console.log("http://checkerproxy.net/getProxy?date=" + yesterday.toDBString());
    var request_yesterday = requestp(request_options).then(function(body) {
        var $ = cheerio.load(body);
        var total = $("ul").eq(1).find("li").length;
        if(total > 0) {
          $("ul").eq(1).find("li").each(function(i, elem) {
            proxy_list.push($(elem).text().replace(/^(\d+\.\d+\.\d+\.\d+:\d+)(\s+.*)?/gi, "$1"));
          });
        }
    }, function(err) {
      console.log("ERR getting yesterday proxy: " + err);
    });

    request_options["url"] = "http://checkerproxy.net/getProxy?date=" + today.toDBString();
    console.log("http://checkerproxy.net/getProxy?date=" + today.toDBString());
    var request_today = requestp(request_options).then(function(body) {
        var $ = cheerio.load(body);
        var total = $("ul").eq(1).find("li").length;
        if(total > 0) {
          $("ul").eq(1).find("li").each(function(i, elem) {
            proxy_list.push($(elem).text().replace(/^(\d+\.\d+\.\d+\.\d+:\d+)(\s+.*)?/gi, "$1"));
          });
        }
    }, function(err) {
      console.log("ERR getting today proxy: " + err);
    });

    return Promise.all([request_yesterday, request_today]).then(function() {
      /*
      var array_proxy = [];
      proxy_list.forEach(function(item) {
        array_proxy.push(item.split(":"));
      });
      */
      get_callback(proxy_list);
    });
  }
}
