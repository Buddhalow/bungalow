var path = require('path');
var fs = require('fs');
var async = require('async');
var less = require('less');
var request = require('request');
var url = require('url');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var utils = require('./utils.js');
var express =require('express');
var app = express();





app.get('/app', function (req, res) {
  var dirs = fs.readdirSync(__dirname + path.sep + 'client' + path.sep + 'apps');
  var apps = []
  dirs.forEach(function (appId) {
    var manifest = JSON.parse(fs.readFileSync(__dirname + path.sep + 'client' + path.sep + 'apps' + path.sep + appId + path.sep + 'manifest.json'));
    apps.push(manifest);
  });
  res.json({
    objects: apps
  });
})


app.get('/theme', function (req, res) {
  var dirs = fs.readdirSync(__dirname + path.sep + 'client' + path.sep + 'themes');
  var apps = []
  dirs.forEach(function (appId) {
    var manifest = JSON.parse(fs.readFileSync(__dirname + path.sep + 'client' + path.sep + 'themes' + path.sep + appId + path.sep + 'manifest.json'));
    apps.push(manifest);
  });
  res.json({
    objects: apps
  });
})


app.get('/plugin', function (req, res) {
  var dirs = fs.readdirSync(__dirname + path.sep + 'client' + path.sep + 'js' + path.sep + 'plugins');
  var apps = []
  dirs.forEach(function (appId) {
    var manifest = JSON.parse(fs.readFileSync(__dirname + path.sep + 'client' + path.sep + 'js' + path.sep + 'plugins' + path.sep + appId + path.sep + 'manifest.json'));
    apps.push(manifest);
  });
  res.json({
    objects: apps
  });
})

function getServices() {
    var dirs = fs.readdirSync(__dirname + path.sep + 'services');
  var apps = []
  dirs.forEach(function (appId) {
    var manifest = JSON.parse(fs.readFileSync(__dirname + path.sep + 'services' + path.sep + appId + path.sep + 'package.json'));
    apps.push(manifest.bungalow);
  });
  return (apps);
}

app.get('/service', function (req, res) {
  res.json({
      objects: getServices()
  })
});

var services = getServices();

// Load Services
services.map(function (service) {
    console.log(service.id);
    console.log(service);
    var router = require(__dirname + path.sep + 'services' + path.sep + service.id + path.sep + service.id + '.js');
    app.use('/' + service.id, router);
})


app.use(cookieParser());
app.use(cookieSession({
    secret:'32425235235235',
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {secure: false}
}));


module.exports = {
    server: app
};