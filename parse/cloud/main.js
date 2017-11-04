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


Parse.Cloud.define("cravingStats", function(request, response) {
  var query = new Parse.Query('Craving');
    var result = {
        weekdays: {},
        hours: {},
        reasons: {},
        actions: {}
    };
    
    var hours = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        
     var reasons = ['anxiety', 'success', 'failure', 'grief'];
     reasons.map(function (i) {
          result.reasons[i] = {
              total: 0
          };
      }); 
      var statuses = [200, 201, 628];
      
      var actions = ['eat', 'meditation'];
      var foods = ['chocolate', 'candy', 'fastfood'];
      
      actions.map(function (i) {
          result.actions[i] = {
              total: 0,
              
          };
      }); 
        
        hours.map(function (i) {
          result.hours[i] = {
              total: 0,
            
          };
      });
     
        var weekdays = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
      ].map(function (i) {
          var stats = {
              total: 0,
              hours: hours.reduce(slack),
              statuses: statuses.reduce(slack),
              actions: actions.reduce(slack),
              foods: foods.reduce(slack),
              reasons: reasons.reduce(slack)
          };
          result.weekdays[i] = stats;
      });
    
    function slack (a, b) {
        a[b] = {
            total: 0
        };
        return a;
    }
      
      console.log("T");

  query.find().then(function (results) {
      for (var i = 0; i < results.length; i++) {
          var craving = results[i];
          console.log(craving);
          var time = craving.get('time');
          var hour = time.getHours();
          var weekday = time.getDay();
            var statusCode = craving.get('statusCode');
          var action = craving.get('action');
          var food = craving.get('food');
          result.prype('weekdays', weekday);
          prype(result.weekdays[weekday], 'statuses', statusCode);
          
          prype(prype(result.weekdays[weekday], 'hours', hour), 'statuses', statusCode);
          prype(result, 'hours', hour);
          prype(result, 'statuses', statusCode);
          result.food[food]++;
      }
      response.success(result);
  })
});

var prype = function (obj, key, k) {
    
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