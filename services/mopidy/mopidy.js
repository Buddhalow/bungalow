var express = require('express');
var app = express();


function MopidyService() {
    
}

var mopidy = new MopidyService();


module.exports = {
    service: mopidy,
    app: app
}