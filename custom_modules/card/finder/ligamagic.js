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
        proxyUrl: proxy,
        headers: {
          'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
          'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        url: "https://ligamagic.com.br/?view=cards/card&card=" + cardname
      };
      requestp(request_options)
        .then(function(body) {
          if(body.indexOf("vetPorEdicao") == -1)
            reject("Card not found");

          //read the data
          var $ = cheerio.load(body);

          var title = $(".nome-auxiliar").eq(0).text();
          var card_sets_obj = {};
          var card_set_array = [];
          var card = {};
          var curency = "BRL";
          $(".card-image .edicoes li").each(function(i, elem) {
            var regexSetInfo = new RegExp("vetPorEdicao\\[" + i.toString() + "\\]=\\[(.*?)\\];", "i");
            var setInfo = JSON.parse("[" + body.match(regexSetInfo)[1] + "]");

            card_set = setInfo[6];
            card_sets_obj[card_set] = {}; //No prices found yet!
            card_sets_obj[card_set][curency] = []; //Set prices as USD

            // Minor, medium and major price for the card, and also set info
            card_sets_obj[card_set][curency].push(setInfo[5].replace(',', '.'));
            card_sets_obj[card_set][curency].push(setInfo[4].replace(',', '.'));
            card_sets_obj[card_set][curency].push(setInfo[3].replace(',', '.'));
          });

          card["title"] = title;
          card["prices"] = card_sets_obj;
          card["sets"] = Object.keys(card_sets_obj);
          card["currencies"] = [curency];
          card["url"] = request_options["url"];

          resolve(card);
          //resolve("Misterious card info!");
        }, function(err) {
          reject(err); //Cascading promises
        });
    });
  }
}
