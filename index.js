var config = require('./config');
var proxy = require('./custom_modules/proxy');
var card_finder_factory = require('./custom_modules/card/finder/factory');
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var express = require('express');
var app = new express();
var proxy_list = [];
var sites = ['ligamagic', 'tcgplayer', 'magicdomain'];

String.prototype.urldecode = function() {
  return decodeURIComponent(this).replace(/\+/g, ' ');
}

/* UPDATE the proxy_list */
var update_proxies = function (callback) {
  console.log("Updating proxy list");
  proxy.get(function(pl) {
    proxy_list = pl;
    console.log("Proxy list updated");
  });
  callback !== undefined && callback();

  setTimeout(update_proxies, 1000 * 60 * 60 * 24); //Update proxies every 24 hours
}
update_proxies();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({status: 'error', data: { msg : 'Method not found' } });
});

app.get('/update_list', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  update_proxies(function() {
    res.json({status: 'ok', data: { msg : 'Proxy list updated' } });
  });
});

app.get('/get_proxy', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if(proxy_list.length == 0) {
    update_proxies(function() {
      var random = parseInt(Math.random() * proxy_list.length, 10);
      res.json({status: 'ok', data: { proxy: proxy_list[random] } });
    });
  }else{
    var random = parseInt(Math.random() * proxy_list.length, 10);
    res.json({status: 'ok', data: { proxy: proxy_list[random] } });
  }
});

app.get('/:website/card/:cardname', function(req, res) {
  var website = req.params.website;
  var cardname = req.params.cardname;
  res.setHeader('Content-Type', 'application/json');

  if(sites.indexOf(website) == -1) {
    res.json({status: 'error', data: { msg : 'Source not found.' } });
  }else{
    try {
      var random = parseInt(Math.random() * proxy_list.length, 10);
      var finder = card_finder_factory.get(website);
      var find_promise = finder.find(cardname, proxy_list[random]);
      find_promise.then(function(card) {
        res.json({status: 'ok', data:
          {
            card: card.title.urldecode(),
            currencies : card.currencies,
            sets: card.sets,
            prices : card.prices,
            url: card.url
          }
        });
      }, function(err) {
        res.json({status: 'error', data:
          {
            msg: err
          }
        });
      });
    }catch(err) {
      console.log(err);
    }
  }
});

const PORT = process.env.PORT || 5000

app.listen(PORT);
console.log("Running on port " + PORT);
