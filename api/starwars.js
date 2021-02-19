
const http = require('http')
var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});
/*
const options = {
  hostname: 'swapi.py4e.com',
  port: 443,
  path: '/api/planets/',
  method: 'GET'
}
*/

var translate = new AWS.Translate();

var url = 'http://swapi.py4e.com/api/planets/';

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      if (res.statusCode === 200) {
        try {
          var response = JSON.parse(body);

          for (let i = 0; i < response.results.length; i++) {

            console.log(Object.keys(response.results[i]))

            var params = {
              SourceLanguageCode: 'auto',
              TargetLanguageCode: 'es',
              Text: JSON.stringify(Object.keys(response.results[i]))
            };

            translate.translateText(params, function (err, data) {
              if (err) console.log(err, err.stack); 
              else     console.log(data['TranslatedText']);
            });
          }

        } catch (e) {
            console.log('Error parsing JSON')
        }
      } else {
        console.log('Status:', res.statusCode)
      }
        
    });
}).on('error', function(err){
      console.log(err);
});
