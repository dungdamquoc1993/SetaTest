
const crypto = require('crypto')
const helpers = {}

helpers.hash = function(str) {
    if(typeof(str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', process.env.HashingSecret).update(str).digest('hex')
        return hash
    } else {
        return false
    } 
}

helpers.createRandomString = function(){
      var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var str = '';
      for(i = 1; i <= 20; i++) {
          var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
          str+=randomCharacter;
      }
      return str;
  };

module.exports = helpers