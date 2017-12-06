var Sequelize = require('sequelize');
var express = require('express');

var app = express();


var sequelize = new Sequelize('c9', 'drsounds', '', {
  dialect: 'mysql'
});


var Category = sequelize.define('radioflow_category', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image_url: Sequelize.STRING,
  header_image_url: Sequelize.STRING,
  icon: Sequelize.STRING
});


var Podcast = sequelize.define('radioflow_podcast', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image_url: Sequelize.STRING,
  header_image_url: Sequelize.STRING,
});

var Station = sequelize.define('radioflow_station', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image_url: Sequelize.STRING,
  header_image_url: Sequelize.STRING,
});

var Company = sequelize.define('radioflow_company', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image_url: Sequelize.STRING,
  header_image_url: Sequelize.STRING,
});



var PodcastCategories = sequelize.define('radioflow_podcast_categories', {
    
});

Podcast.belongsTo(Category);
Podcast.belongsTo(Station);
Station.belongsTo(Company);
Podcast.belongsTo(Company);
Podcast.belongsToMany(Category, {through: 'PodcastCategories'});


function RadioService () {
    
}


RadioService.prototype.getCategories = function (offset, limit) {
    return new Promise(function (resolve, fail) {
        Category.findAll({
            
        }).then(function (categories) {
            resolve({
                objects: categories
            });
        })
    });
}


RadioService.prototype.getPodcastsInCategory = function (category_id, offset, limit) {
    return new Promise(function (resolve, fail) {
        Podcast.findAll({
            where: {
                categoryId: category_id
            } 
        }).then(function (podcasts) {
            resolve({
                objects: podcasts
            });
        })
    });
}


RadioService.prototype.getCategoryById = function (id) {
    return new Promise(function (resolve, fail) {
        Category.findById(id).then(function (category) {
            resolve(category);
        }, function (err) {
            fail(err);
        })
    });
}


var radio = new RadioService();


app.get('/category', function (req, res) {
   radio.getCategories(req.query.offset || 0, req.query.limit || 0).then(function (result) {
       res.json(result).send();
   }, function (err) {
       res.error(err).send();
   });
});


app.get('/category/:identifier', function (req, res) {
   radio.getCategoryById(req.params.identifier).then(function (result) {
       res.json(result).send();
   }, function (err) {
       res.error(err).send();
   });
});



app.get('/category/:category_id/podcast', function (req, res) {
   radio.getPodcastsInCategory(req.params.category_id, req.query.offset || 0, req.query.limit || 0).then(function (result) {
       res.json(result).send();
   }, function (err) {
       res.error(err).send();
   });
});


module.exports = {
    service: radio,
    app: app
}