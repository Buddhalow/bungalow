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
var ogs = require('open-graph-scraper');


module.exports = function (server) {


app.get('/lookup', function (req, res) {
  var uri = req.query.uri;
  ogs({
    url: uri
  }, function (err, results) {
    if (err) {
      res.status(500).json(err).end();
    }
    var data = results.data;
    var object = {
      slug: '',
      name: data.ogTitle,
      type: data.ogType,
      url: data.ogUrl,
      uri: data.ogUrl,
    
      image_url: data.ogImage.url,
      images: [{
        url: data.ogImage
      }],
      description: data.ogDescription
    };
    res.json(object).end();
  })
  
});

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
    console.log(appId);
    var manifest = JSON.parse(fs.readFileSync(__dirname + path.sep + 'services' + path.sep + appId + path.sep + 'package.json'));
    try {
    if ('bungalow' in manifest)
      apps.push(manifest.bungalow);
    } catch (e) {
      console.log(e.stack);
    }
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
    var routerFactory = require(__dirname + path.sep + 'services' + path.sep + service.id + path.sep + service.id + '.js');
    var router = null;
    if (routerFactory instanceof Function) {
      router = routerFactory(server);
    } else {
      router = routerFactory.app;
    }
    if (!!router) {
      app.use('/' + service.id, router);
    }
  
})


app.use(cookieParser());
app.use(cookieSession({
    secret:'32425235235235',
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {secure: false}
}));
  
  return {
      app: app
  }
}