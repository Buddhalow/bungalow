Parse.Cloud.afterSave("FungalTreatment", function(request) {
  Parse.Cloud.httpRequest({
      method: 'POST',
      headers: {
          "Authorization": "OAuth 52342423424233342",
          "Content-Type": "application/json"
       },

       //adds a new class to my parse data
       url: "https://api.qinance.aleros.webfactional.com/api.php?resource=transactions",


       body: {"name": "Fungal treatment", "sum": 2800, "items": [
         {
          'amount': 2800,
          "dc": "d",
          "code": "2814"
         },
         {
           "amount": 2800,
           "dc": "c",
           "code": "1998"
         }
        ]},

       success: function (httpResponse) {
                console.log(httpResponse.text);
                response.success(httpResponse);
       },
       error:function (httpResponse) {
                console.error('Request failed with response code ' + httpResponse.status);
                response.error(httpResponse.status);
       }
  })
});