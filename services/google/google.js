var fs = require('fs');
var request = require('request');
var os = require('os');
var md5 = require('md5');
var cache = require('../cache/cache.js');
var api_key_file = os.homedir() + '/.bungalow/google.key.json';
var temp_dir = os.homedir() + '/.bungalow';


function Google() {
    
    this.apikeys = JSON.parse(fs.readFileSync(api_key_file));
}


Google.prototype.search = function (q, site, fields, cx, exclude, offset) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var url = 'https://www.googleapis.com/customsearch/v1?key=' + self.apikeys.client_id + '&fields=' + fields + '&cx=' + cx + '&q=' + encodeURI(q) + '&siteSearch=' + site + '&siteFilter=i&start=' + (offset + 1) + '&excludeTerms=' + encodeURI(exclude);
        
        if (cache.isCached(url)) {
            var result = cache.load(url);
            resolve(result);
            return;
        } 
        request({
            url:url 
        }, function (err, response, body) {
            if (err) {
                reject(err);
                return;
            };
            var result = JSON.parse(body);
            if (!('items' in result)) {
                result.items = []; 
            }
            result.service = {
                id: 'google',
                name: 'Google',
                type: 'google',
                uri: 'bungalow:service:google'
            };
            cache.save(url, result);
            resolve(result);
        });
    });
}


var google = new Google();


module.exports = {
    service: google
};