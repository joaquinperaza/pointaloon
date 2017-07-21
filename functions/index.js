// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
var http = require('http');

admin.initializeApp(functions.config().firebase);


 exports.createToken = functions.https.onRequest((request, response) => {
 function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
     if(validateEmail(request.param('email'))){
         
            // Grab the text parameter.
    
    // [START adminSdkPush]
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    var pushed = admin.database().ref('/tokens').push();
    
    pushed.set({
        email: request.param('email'),
        created: admin.database.ServerValue.TIMESTAMP,
        seen: admin.database.ServerValue.TIMESTAMP
    });
         var resp ={
           token: pushed.key,
           email: request.param('email')
       };
    
        response.send(resp);
         
         
     }
         else{
              response.send("400 BAD REQUEST, check your parameters");
         }
     
     
     
     
 });


 exports.updater = functions.https.onRequest((request, response) => {
 
     function parsetodb(string){
         var parsed = JSON.parse(string);
         
    for(var attributename in parsed){
        
        if (parsed[attributename].hasOwnProperty(0) && parsed[attributename].hasOwnProperty(1)&&parsed[attributename].hasOwnProperty(2) && parsed[attributename].hasOwnProperty(10)&& parsed[attributename].hasOwnProperty(16)){
             var baloon={
                 name:parsed[attributename][16],
                 lat: parsed[attributename][1],
                 lng: parsed[attributename][2],
                 alt: parsed[attributename][4],
                 speed: parsed[attributename][5],
                 track: parsed[attributename][3],
                 seen: parsed[attributename][10],
                 
             };
              var pushed = admin.database().ref('/loons/'+parsed[attributename][16]).set(baloon);
            
            
  
} 
   
}   
          response.send("200");
     }
     
     function update() {
     var options = {
  host: 'https://data-live.flightradar24.com',
  path: '/zones/fcgi/feed.js?reg=!BALLOON&'
};
     
     callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
      parsetodb(str);
    
      
      
      
  });
}
     
http.request(options, callback).end();
  
}
 
     update();
    
     
    
 });


 exports.point = functions.https.onRequest((request, response) => { 
     if(request.param('t') && request.param('lat') && request.param('lng') && request.param('alt')){
         
         
     } else{
              response.send("400 BAD REQUEST, check your parameters and token authenticity");
         }
     
     
 });
