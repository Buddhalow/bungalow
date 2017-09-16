var Event = Parse.Object.extend('Event');


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


Parse.Cloud.afterSave("Craving", function(request, response) {
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
          "dc": "C",
          "code": "2224"
         },
         {
           "amount": 2800,
           "dc": "D",
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



Parse.Cloud.afterSave("Cleaning", function(request, response) {
    let room = request.object.get('room');
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
          }=;
          response.scceess(result);
      }
  })
});