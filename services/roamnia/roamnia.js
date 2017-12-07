var fs = require('fs');
var os = require('os');

var express = require('express');

var Parse = require('parse/node');

var key_path = os.homedir() + '/.bungalow/roamnia.key.json';



var app = express();


function RoamniaService() {
    this.credentials = JSON.parse(fs.readFileSync(key_path));
    Parse.initialize(this.credentials.app_id, this.credentials.client_id);
    Parse.serverURL = 'https://parseapi.back4app.com/'
    Parse.liveQueryServerURL = 'wss://leros.back4app.io';
}


RoamniaService.prototype.login = function (username, password) {
    var self = this;
    return new Promise(function (resolve, reject) {
        Parse.User.logIn(username, password).then(function (result) {
            resolve({
                username: result.username,
                password: result.password
            });
        }, function (error) {
            reject(error);
        })
    })
}


RoamniaService.prototype.addObject = function (model, object) {
    return new Promise(function (resolve, reject) {
        var obj = new Parse.Object(model);
        for (var f of model.fields) {
            var k = f.id;
            var val = data[k];
            if (f.type == 'number') {
                        val = parseInt(val); 
            } else if (f.type == 'datetime-local') {
                val = new Date(val);
            } else if (val instanceof Object) {
                val = {"__type": "Pointer", "className": f.model.id, "objectId": val.id};
            }
            
            obj.set(k, val);
        }
        obj.save({
            success: function (object) {
                resolve(simplify(object));
            },
            error:  function (error) {
                reject(error);
            }
        });
    });
}


RoamniaService.prototype.updateObject = function (model, id, data) {
    return new Promise(function (resolve, reject) {
        var q = new Parse.Query(this.Model);
        q.get(data.id).then(function (obj) {
            for (var f of this.table.fields) {
                var k = f.id;
                var val = data[k];
                if (f.type == 'number') {
                    val = parseInt(val); 
                } else if (f.type == 'datetime-local') {
                    val = new Date(val);
                } else if (val instanceof Object) {
                    val = {"__type": "Pointer", "className": f.model.id, "objectId": val.id};
                }
                obj.set(k, val);
            }
            obj.save({
                success: function (obj) {
                    resolve(obj);
                },
                error: function (e) {
                    reject(e)
                }
            });
        });
    });
}


RoamniaService.prototype.updateObject = function (model, object) {
    return new Promise(function (resolve, reject) {
        var obj = new Parse.Object(model);
        for (var f of model.fields) {
            var k = f.id;
            var val = data[k];
            if (f.type == 'number') {
                        val = parseInt(val); 
            } else if (f.type == 'datetime-local') {
                val = new Date(val);
            } else if (val instanceof Object) {
                val = {"__type": "Pointer", "className": f.model.id, "objectId": val.id};
            }
            
            obj.set(k, val);
        }
        obj.save({
            success: function (object) {
                resolve(simplify(object));
            },
            error:  function (error) {
                reject(error);
            }
        });
    });
}


RoamniaService.prototype.getObjectById = function (model, id) {
    return new Promise(function (resolve, reject) {
        var query = new Parse.Query(model.id);
        model.fields.filter(f => f.type === 'manyToOne').map(f => {
            query = query.include(f.id);    
        });
        query.get(id, {
            success: function (obj) {
                resolve(obj.simplify());
            }
        }).simplify();
    });
}

RoamniaService.prototype.findObjects = function (model, options) {
    return new Promise(function (resolve, reject) {
        var query = new Parse.Query(model);
        model.fields.filter(f => f.type === 'manyToOne').map(f => {
            query = query.include(f.id);    
        });
        if (options instanceof String ) {
                    
            query =  query.contains('name', options);
        } else if (options instanceof Object) {
            for (var k in Object.keys(options)) {
                var str = options[k];
                if (str instanceof String) {
                query = query.contains(k, str);
                }
            }
        }
        query.find({
            success: function (objects) {
               resolve({
                   objects: objects
               });
            },
            error: function (error) {
                reject(error);
            }
        });

    });
}

var service = new RoamniaService();


module.exports = {
    app: app,
    service: service
};