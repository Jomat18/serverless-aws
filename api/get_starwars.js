'use strict';

const http = require('http')
const AWS = require('aws-sdk'); 

var url = 'http://swapi.py4e.com/api/planets/';

module.exports.get = (event, context, callback) => {

  http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      if (res.statusCode === 200) {
        try {
          const body = JSON.parse(body);

          const response = {
            statusCode: 200,
            body: body,
          };
          callback(null, response);          

        } catch (e) {
            console.log('Error parsing JSON')
        }
      } else {
        console.log('Status:', res.statusCode)
      }
        
    });
}).on('error', function(err){
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the item.',
      });
});
};
