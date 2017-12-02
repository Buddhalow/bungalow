var Event = Parse.Object.extend('Event');
var Aqtivity = Parse.Object.extend('Aqtivity');


Parse.Cloud.afterSave("Roaming", function (request, response) {
    var spiritualAqtivity = new Aqtivity();
    spiritualAqtivity.set('facility', request.object.get('facility'));
    spiritualAqtivity.set('sport', request.object.get('spiritualSport'));
    spiritualAqtivity.set('time', request.object.get('time'));
    spiritualAqtivity.set('statusCode', request.object.get('statusCode'));
    spiritualAqtivity.save({
        success: function (spiritualAqtivity) {
            var physicalAqtivity = new Aqtivity();
            physicalAqtivity.set('facility', request.object.get('roamingFacility'));
            physicalAqtivity.set('sport',request.object.get('physicalSport'));
            physicalAqtivity.set('time', request.object.get('time'));
            physicalAqtivity.set('statusCode', request.object.get('statusCode'));
            physicalAqtivity.set('spiritualAqtivity', spiritualAqtivity);
            spiritualAqtivity.set('physicalAqtivity', physicalAqtivity);
            
            physicalAqtivity.save({
                success: function (physicalActivity) {
                    spiritualAqtivity.save({
                        success: function (spiritualAqtivity) {
                            request.object.set('spiritualAqtivity', spiritualAqtivity);
                            request.object.set('physicalActivity', physicalActivity);
                            request.object.save({
                                success: function (object) {
                                    response.success(object);
                                },
                                error: function () {
                                    response.error({
                                        error: 'error'
                                    });
                                }
                            });
                        },
                        error: function (err) {
                            response.error();
                        }
                    })
                },
                error: function (err) {
                    response.error();
                }
            });
        },
        error: function (err) {
            response.error();
        }
    });
})


Parse.Cloud.afterSave("FungalTreatment", function(request, response) {
    var event = new Event();
    event.set('object', {
        id: 'trichophytonrubrum',
        name: 'Trichophyton Rubrum'
    });
    event.set('predicate', {
        id: request.object.get('objectId'),
        type: 'fungaltreatment',
        name: 'Treatment'
    });
    event.set('time', new Date());
    event.save();
    Parse.Cloud.httpRequest({
      method: 'POST',
      headers: {
          "Authorization": "OAuth 52342423424233342",
          "Content-Type": "application/json"
       },

       //adds a new class to my parse data
       url: "http://api.qinance.aleros.webfactional.com/api.php?resource=transactions",


       body: {"name": "Craving", "sum": 2800, "items": [
         {
          'amount': 2800,
          "dc": "D",
          "code": "2814"
         },
         {
           "amount": 2800,
           "dc": "C",
           "code": "1998"
         }
        ]},

       success: function (httpResponse) {
                console.log(httpResponse.text);
                response.success(httpResponse);
       },
       error:function (httpResponse) {
                console.error('Request failed with response code ' + httpResponse);
                response.error(httpResponse.text);
       }
  })
});

    var increase = function (obj, key) {
        if (!(key in obj)) {
            obj[key] = 0;
        }
        obj[key]++;
    }
    

Parse.Cloud.define("cravingStats", function(request, response) {
    
    var aggregate = request.params.aggregate;
    if (aggregate == 'weekday') {
        var result = {
            
        };
        Promise.all([0, 1, 2, 3, 4, 5, 6].map(
            function (weekday) {
                return new Promise(function (resolve, fail) {
                    generateStats(new Parse.Query('Craving'), {aggregate: aggregate, weekday: weekday}).then(function (data) {
                       result[weekday] = data;
                       resolve(data);
                    }, function (err) {
                        fail(err);
                    });
                });
            }
        )).then(function (results) {
            response.success(result);
        }, function (err) {
            response.error(err);
        });
    } else if (aggregate == 'hour') {
        var result = {
            
        };
        Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(
            function (hour) {
                return new Promise(function (resolve, fail) {
                    generateStats(new Parse.Query('Craving'), {aggregate: aggregate, hour: hour}).then(function (data) {
                       result[hour] = data;
                       resolve(data);
                    }, function (err) {
                        fail(err);
                    });
                });
            }
        )).then(function (results) {
            response.success(result);
        }, function (err) {
            response.error(err);
        });
    } else {
        generateStats(new Parse.Query('Craving')).then(function (r) {
            response.success(result);
        }, function (error) {
            response.error(error);
        });
    }
    
    function generateStats(query, options) {
        options = options || {aggregate: '', weekday: ''};
        return new Promise(function (resolve, fail) {
            var hours = {};
            var statuses = {};
            var actions = {};
            var foods = {};
            var reasons = {};
            var weekdays = {};
            var aggregate = options.aggregate;
            
            query.each(
                function (craving) {
                    try {
                      var time = craving.get('createdAt');
                      console.log(time);
                      var hour = time.getHours();
                      var month = time.getMonth();
                      var weekday = time.getDay();
                      console.log(weekday);
                      var date = time.getDate();
                      if (aggregate == 'weekday' && weekday != options.weekday) return;
                      if (aggregate == 'hour' && hour != options.hour) return;
                      if (aggregate == 'month' && month != options.month ) return;
                      if (aggregate == 'date' && date != options.date ) return;
                      
                      var reason = craving.get('reason');
                      increase(weekdays,weekday);
                      increase(hours, hour);
                      increase(reasons, reason);
                        var statusCode = craving.get('statusCode');
                        increase(statuses,statusCode);
                      var action = craving.get('action');
                      increase(actions, action);
                      var food = craving.get('food');
                      increase(foods, food);
                    } catch (e) {
                        console.log(e.stack);
                    }
                }, 
                {
                    success: function () {
                        resolve({
                            statuses: statuses,
                            actions: actions,
                            foods: foods,
                            
                            reasons: reasons,
                            weekdays: weekdays
                        });
                    },
                    error: function (error) {
                        fail(error);
                    }
                }
            );
        });
    }
});

var prype = function (obj, key, k) {
    if (!obj) {
    
    }
    if (!(obj[key] instanceof Object)) {
        obj[key] = {};
    }
    if (!(obj[key][k] instanceof Object)) {
        obj[key][k] = {
            total: 0
        };
    } else {
        obj[key][k].total++;
    }
    return obj[key];
}



Parse.Cloud.afterSave("Cleaning", function(request, response) {
    var room = request.object.get('room');
    room.set('lastCleaned', new Date());
    room.save();
    Parse.Cloud.httpRequest({
      method: 'POST',
      headers: {
          "Authorization": "OAuth 52342423424233342",
          "Content-Type": "application/json"
       },

       //adds a new class to my parse data
       url: "http://api.qinance.aleros.webfactional.com/api.php?resource=transactions",


       body: {"name": "Fungal treatment", "sum": 2800, "items": [
         {
          'amount': 2800,
          "dc": "C",
          "code": "1998"
         },
         {
           "amount": 2800,
           "dc": "D",
           "code": "20149"
         }
        ]},

       success: function (httpResponse) {
                console.log(httpResponse.text);
                response.success(httpResponse);
       },
       error:function (httpResponse) {
                console.error('Request failed with response code ' + httpResponse);
                response.error(httpResponse.text);
       }
  })
});


Parse.Cloud.define("bungalowStatus", function(request, response) {
  var query = new Parse.Query("Room");
  query.find({
      sucess: function (objects) {
          var result = [];
         
          objects.map(function (obj) {
                var lastCleaned = obj.get('lastCleaned');
                var expiresIn = obj.get('expires_in');
                var now = new Date();
                var ttl = expiresIn.getTime() - lastCleaned.getTime();
                var integrity = now / ttl;
              result.push({
                  name: obj.get('name'),
                  id: obj.get('id'),
                    lastCleaned: lastCleaned,
                  integrity: integrity
              });
          });
          response.scceess(result);
      }
  })
});