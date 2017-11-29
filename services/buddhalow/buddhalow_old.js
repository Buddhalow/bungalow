var express = require('express');
var app = express();
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const pw = require('./password');




var Sequelize = require('sequelize');
var sequelize = new Sequelize('c9', 'drsounds', '', {
  host: 'localhost',
  dialect: 'mysql' 
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  verified: Sequelize.BOOL
});


var Post = sequelize.define('post', {
    body: Sequelize.TEXT,
    time: Sequelize.DATE,
    uri: Sequelize.STRING
});


Post.belongsTo(Post);


Post.belongsTo(User);


var Interaction = sequelize.define('interaction', {
    time: Sequelize.DATE,
    type: Sequelize.STRING,
    yin: Sequelize.INT,
    yang: Sequelize.INT
});


Interaction.belongsTo(Post);
Interaction.belongsTo(User);


var Relation = sequelize.define('relation', {
     source: Sequelize.TEXT,
     destination: Sequelize.TEXT,
     source_type: Sequelize.TEXT,
     destination_type: Sequelize.TEXT,
     established: Sequelize.DATE
});


var Session = sequelize.define('sessions', {
    accessToken: Sequelize.TEXT,
    issued: Sequelize.DATE
});


Session.belongsTo(User);


function getUserByAccessToken(accessToken) {
    return new Promise(function (resolve, reject) {
       Session.findOne({
           where: {
               accessToken: accessToken
           },
           include: [User]
       }).then(function (session) {
           if (!session) {
               reject(403);
               return;
           }
           resolve(session.get('user'));
       })
    });
}


app.post('/user', function (req, res) {
    var data = JSON.parse(req.body);
    User.create({
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: pw.hash(data.password)
    }).then(function (user) {
        if (!!user) {
            Session.create({
                user: user,
                accessToken: pw.hash(new Date().getTime()),
                issued: new Date()
            }, {
                include: [User]
            }).then(function (session) {
                if (!!session) {
                    res.json({
                        accessToken: session.get('accessToken')
                    })
                }
            });
        } 
    });
});


app.post('/post', function (req, res) {
    var data = JSON.parse(req.body);
    getUserByAccessToken(req.headers['Authorization'].split(' ')[1]).then(function (user) {
        Post.create({
            body: data.body,
            time: new Date(),
            uri: data.uri || 'urn:undefined'
        }).then(function (post) {
            if (!!post) {
                res.json(201).end(201);
            } 
        }, function (err) {
            res.status(err).end();
        });
    }, function (err) {
        res.status(403).end();
    });
});


app.get('/user/:id', function (req, res) {
    getUserByAccessToken(req.headers['Authorization'].split(' ')[1]).then(function (user) {
        User.findOne({
            body: data.body,
            time: new Date(),
            uri: data.uri || 'urn:undefined'
        }).then(function (post) {
            if (!!post) {
                res.json(201).end(201);
            } 
        }, function (err) {
            res.status(err).end();
        });
    }, function (err) {
        res.status(403).end();
    });
});


app.post('/login', function (req, res) {
    var login = JSON.parse(req.body);
    User.findOne({
        where: {
            username: login.username,
            password: pw.hash(login.password)
        }
    }).then(function (user) {
        if (!!user) {
            Session.create({
                user: user,
                accessToken: pw.hash(new Date().getTime()),
                issued: new Date()
            }, {
                include: [User]
            }).then(function (session) {
                if (!!session) {
                    res.json({
                        accessToken: session.get('accessToken')
                    })
                }
            });
        }
    })
    
})