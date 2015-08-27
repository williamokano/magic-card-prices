var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');
var requestp = require('../../requestp');

/* Resource for ligamagic */
module.exports = {
  find : function(cardname, proxy) {
    // Add some way to get the card with this resource
    console.log("Looking for " + cardname);
    console.log("Proxy: " + proxy);
    return new Promise(function(resolve, reject) {
      var request_options = {
        headers: {
          'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
          'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        url: "http://ligamagic.com.br/?view=cards%2Fsearch&card=" + cardname
      };
      requestp(request_options)
        .then(function(body) {

          //read the data
          var $ = cheerio.load(body);
          var title = $(".cardTitle").text();
          var card_sets = {};
          var card = {};
          $(".overview td").each(function(i, elem) {
            var card_set = $("a", elem).attr("href");
            card_set = card_set.split("%3d")[1];
            card_sets[card_set] = []; //No prices found yet!
          });

          card["title"] = title;
          card["sets"] = card_sets;

          resolve(card);
          //resolve("Misterious card info!");
        }, function(err) {
          reject(err); //Cascading promises
        });
    });
  }
}
