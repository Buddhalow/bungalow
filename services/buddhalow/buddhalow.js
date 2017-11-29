
var express = require('express');
var app = express();
var ENV = process.env.NODE_ENV || 'development';
module.exports = function (server) {
    // setup deployd
    require('deployd').attach(server, {
        env: ENV,
        db: {host:'localhost', port:27017, name:'buddhalow'}
    });
    
    // After attach, express can use server.handleRequest as middleware
    app.use(server.handleRequest);
    console.log(app);
    return app;
}