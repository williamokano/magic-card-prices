var config = require('../../../config');
/* Exports a card finder factory */
module.exports = {
  get : function (name) {
    if(config.sites.indexOf(name) == -1) {
      throw "Resource not found";
    }else{
      return require('./' + name);
    }
  }
};
