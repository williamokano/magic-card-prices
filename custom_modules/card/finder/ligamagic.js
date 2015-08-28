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

          if(body.indexOf("0-0") !== -1)
            reject("Card not found");

          //read the data
          var $ = cheerio.load(body);
          var title = $(".cardTitle").text();
          var card_sets = {};
          var card = {};
          $(".overview td").each(function(i, elem) {
            var card_set = $("a", elem).attr("href");
            card_set = card_set.split("%3d")[1];
            card_sets[card_set] = []; //No prices found yet!

            //@TODO:  Stop reading from the Javascript at the end of the page
            //        and scrappe the page instead. Dumbass! There's a table
            //        with the prices, lel!

            //Find the minor price for the card
            var regexMinorPrice = new RegExp("VETprecoMenor\\[" + i.toString() + "\\]\\s+=\\s+\"(.*)\";", "i");
            var minorPrice = body.match(regexMinorPrice)[1].replace(',', '.');
            card_sets[card_set].push(minorPrice);

            //Find the medium price for the card
            var regexMediumPrice = new RegExp("VETprecoMedio\\[" + i.toString() + "\\]\\s+=\\s+\"(.*)\";", "i");
            var mediumPrice = body.match(regexMediumPrice)[1].replace(',', '.');
            card_sets[card_set].push(mediumPrice);

            //Find the major price for the card
            var regexMajorPrice = new RegExp("VETprecoMaior\\[" + i.toString() + "\\]\\s+=\\s+\"(.*)\";", "i");
            var majorPrice = body.match(regexMajorPrice)[1].replace(',', '.');
            card_sets[card_set].push(majorPrice);
          });

          card["title"] = title;
          card["sets"] = card_sets;
          card["url"] = request_options["url"];

          resolve(card);
          //resolve("Misterious card info!");
        }, function(err) {
          reject(err); //Cascading promises
        });
    });
  }
}
