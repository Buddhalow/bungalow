var fs = require('fs');
var request = require('request');
var os = require('os');


var api_key_file = os.homedir() + '/.bungalow/google.key.json';


function Google() {
    
    this.apikeys = JSON.parse(fs.readFileSync(api_key_file));
}


Google.prototype.search = function (q, site, fields, cx, offset) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var url = 'https://www.googleapis.com/customsearch/v1?key=' + self.apikeys.client_id + '&fields=' + fields + '&cx=' + cx + '&q=' + encodeURI(q) + '&siteSearch=' + site + '&siteFilter=i&start=' + offset;
        request({
            url:url 
        }, function (err, response, body) {
            if (err) {
                reject(err);
                return;
            };
            var result = JSON.parse(body);
            result.service = {
                id: 'google',
                name: 'Google',
                type: 'google',
                uri: 'bungalow:service:google'
            };
            resolve(result);
        });
    });
}

var google = new Google();


module.exports = {
    service: google
};