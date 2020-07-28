//Google project Loon tracker
//Programmed in Paysandú, UY by joaquinperaza, joaquin@peraza.uy
//Open source tool for Google Loon project optimization

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
var http = require('http');
var calculate = require('azimuth');
const cors = require('cors')({
    origin: true
});

admin.initializeApp(functions.config().firebase);


exports.createToken = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        if (validateEmail(request.param('email'))) {

            // Grab the text parameter.

            // [START adminSdkPush]
            // Push the new message into the Realtime Database using the Firebase Admin SDK.
            var pushed = admin.database().ref('/tokens').push();

            pushed.set({
                email: request.param('email'),
                created: admin.database.ServerValue.TIMESTAMP,
                seen: admin.database.ServerValue.TIMESTAMP
            });
            var resp = {
                token: pushed.key,
                email: request.param('email')
            };

            response.send(resp);


        } else {
            response.send("400 BAD REQUEST, check your parameters 😵😵😵");

        }



    });
});


exports.update = functions.https.onRequest((request, response) => {

    function parsetodb(string) {
        var parsed = JSON.parse(string);
        var balloons = {};
        for (var attributename in parsed) {

            if (parsed[attributename].hasOwnProperty(0) && parsed[attributename].hasOwnProperty(1) && parsed[attributename].hasOwnProperty(2) && parsed[attributename].hasOwnProperty(10) && parsed[attributename].hasOwnProperty(16)) {
                var balloon = {
                    name: parsed[attributename][16],
                    lat: parsed[attributename][1],
                    lng: parsed[attributename][2],
                    alt: parsed[attributename][4] / 3.28084,
                    speed: parsed[attributename][5],
                    track: parsed[attributename][3],
                    seen: parsed[attributename][10],
                };
                if (balloon.name == '') {
                    balloon.name = 'NONAME' + String(parseInt(Math.random() * (99 - 10) + 10));
                }
                balloons[parsed[attributename][0]] = balloon;
                //var pushed = admin.database().ref('/temploons/' + baloon.name).set(baloon);
            }
        }

        admin.database().ref('/loons/').set(balloons);
        response.send("200");
    }

    function update() {
        callback = function (response) {
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
    
        http.request('https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1&callsign=HBAL', callback).end();
    }
    update();


});

exports.testalert = functions.https.onRequest((request, res) => {
    var balloon={
        lat: -32,
                        lng: -52.9,
                        alt: 2000,
                      name: "HBAL001"
        
    };
    
    function report(ballon,alt){
        var done = false;
       
         callback = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                     console.warn('ALERT');
                    if(done==true){
                         res.send("DONE");
                    }
                    else{
                        done = true;
                    }
                    
                });
            }
          callback2 = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                     console.warn('ALERT');
                     if(done==true){
                         res.send("DONE");
                    }
                    else{
                        done = true;
                    }
                });
            }
    http.request('http://maker.ifttt.com/trigger/loonalert/with/key/dBCIo8dr4J4Ua0b_AnI2h1?value1='+ballon.toString()+'&value2='+alt.toString(), callback).end();
    http.request('http://maker.ifttt.com/trigger/smsalert/with/key/dBCIo8dr4J4Ua0b_AnI2h1?value1='+ballon.toString()+'&value2='+alt.toString(), callback2).end();
    }
    
    if (-35<parseFloat(balloon.lat) && parseFloat(balloon.lat) <-29 && -59<parseFloat(balloon.lng) && parseFloat(balloon.lng) <-52){
                        report(balloon.name,balloon.alt);
        console.info('LOGGED');
                    }
    
    
    
});




exports.autoUpdate = functions.database.ref('/parameters/queue')
    .onCreate(event => {
     function report(ballon,alt){
       
         callback = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                   console.warn('ALERT');
                });
            }
         callback2 = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    console.warn('ALERT');
                });
            }
         
    http.request('http://maker.ifttt.com/trigger/loonalert/with/key/dBCIo8dr4J4Ua0b_AnI2h1?value1='+ballon.toString()+'&value2='+alt.toString(), callback).end();
    http.request('http://maker.ifttt.com/trigger/smsalert/with/key/dBCIo8dr4J4Ua0b_AnI2h1?value1='+ballon.toString()+'&value2='+alt.toString(), callback2).end();
    }


        function parsetodb(string) {
            var parsed = JSON.parse(string);
            var balloons = {};
            for (var attributename in parsed) {

                if (parsed[attributename].hasOwnProperty(0) && parsed[attributename].hasOwnProperty(1) && parsed[attributename].hasOwnProperty(2) && parsed[attributename].hasOwnProperty(10) && parsed[attributename].hasOwnProperty(16)) {
                    var balloon = {
                        name: parsed[attributename][16],
                        lat: parsed[attributename][1],
                        lng: parsed[attributename][2],
                        alt: parsed[attributename][4] / 3.28084,
                        speed: parsed[attributename][5],
                        track: parsed[attributename][3],
                        seen: parsed[attributename][10],
                    };
                    if (balloon.name == '') {
                        balloon.name = 'NONAME' + String(parseInt(Math.random() * (99 - 10) + 10));
                    }
                     if (-35<parseFloat(balloon.lat) && parseFloat(balloon.lat) <-29 && -59<parseFloat(balloon.lng) && parseFloat(balloon.lng) <-52){
                        report(balloon.name,balloon.alt); /// Just to know if there is a loon near Uruguay 😜🎈🎈
                    }
                    balloons[parsed[attributename][0]] = balloon;
                    //var pushed = admin.database().ref('/temploons/' + baloon.name).set(baloon);
                }
            }
            admin.database().ref('/parameters/').child('queue').remove();
            admin.database().ref('/loons/').set(balloons);
            

        }

        function update() {
            callback = function (response) {
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
            http.request('https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1&callsign=HBAL', callback).end();
        }
        update();
    
   

    });



exports.point = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.param('t')) {
            var tk = request.param('t');


            admin.database().ref("tokens").orderByKey().equalTo(tk).once("value", function (snapshot) {

                var userData = snapshot.val();
                if (userData) {
                    var distances = {};
                    admin.database().ref('/tokens/' + tk).child('seen').set(admin.database.ServerValue.TIMESTAMP);



                    //////////////////
                    if (request.param('lat') && request.param('lng') && request.param('alt')) {
                        admin.database().ref("/parameters/updated").once("value", function (last) {


                            if ((Date.now() - last.val()) > 9000) {
                                admin.database().ref('/parameters/').child('queue').remove();
                                admin.database().ref('/parameters/').child('updated').set(Date.now());
                                admin.database().ref('/parameters/').child('queue').set(true);

                            } else {

                            }
                        });
                        admin.database().ref('/tokens/' + tk).child('log').push().set({
                                lat: parseFloat(request.param('lat')),
                                lng: parseFloat(request.param('lng')),
                                alt: parseFloat(request.param('alt')),
                                when: admin.database.ServerValue.TIMESTAMP
                            }

                        );
                        var query = admin.database().ref("loons").orderByKey();
                        query.once("value")
                            .then(function (snapshot) {
                                var iloons = snapshot.val();
                                var min = 0;
                                var key;
                                for (iloon in iloons) {
                                    var loonloc = calculate.azimuth({
                                        lat: parseFloat(request.param('lat')),
                                        lng: parseFloat(request.param('lng')),
                                        elv: parseFloat(request.param('alt'))
                                    }, {
                                        lat: parseFloat(iloons[iloon]['lat']),
                                        lng: parseFloat(iloons[iloon]['lng']),
                                        elv: parseFloat(iloons[iloon]['alt'])
                                    });

                                    distances[iloon] = loonloc;

                                }

                                for (dist in distances) {
                                    if (min > 0) {
                                        if (min > distances[dist]['distance']) {
                                            min = distances[dist]['distance'];
                                            key = dist;
                                        }

                                    } else {
                                        min = distances[dist]['distance'];
                                    }
                                }
                                console.log(distances[key]);
                                var resp = {

                                    ant_alt: distances[key]['altitude'],
                                    ant_azm: distances[key]['azimuth'],
                                    distance: distances[key]['distance'],
                                    loon: iloons[key]
                                };

                                response.send(resp);
                            });


                    } else {
                        response.send("400 BAD REQUEST, check your parameters and token authenticity 😵😵😵");
                    }
                    //////////////
                } else {
                    response.send("403 FORBIDDEN, check your token authenticity 😡😡😡");
                }
            });

        } else {
            response.send("400 BAD REQUEST, check your parameters 😵😵😵");
        }
    });
});


exports.loons = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        if (request.param('t')) {
            var tk = request.param('t');

            admin.database().ref("/parameters/updated").once("value", function (last) {
                if ((Date.now() - last.val()) > 5000) {
                    admin.database().ref('/parameters/').child('queue').remove();
                    admin.database().ref('/parameters/').child('updated').set(Date.now());
                    admin.database().ref('/parameters/').child('queue').set(true);
                }
            });
            admin.database().ref("tokens").orderByKey().equalTo(tk).once("value", function (snapshot) {

                var userData = snapshot.val();
                if (userData) {

                    admin.database().ref('/tokens/' + tk).child('seen').set(admin.database.ServerValue.TIMESTAMP);



                    //////////////////

                    var query = admin.database().ref("loons").orderByKey();
                    query.once("value")
                        .then(function (snapshot) {
                            var iloons = snapshot.val();



                            response.send(iloons);
                        });


                    //////////////
                } else {
                    response.send("403 FORBIDDEN, check your token authenticity 😡😡😡");
                }
            });

        } else {
            response.send("400 BAD REQUEST, check your parameters 😵😵😵");
        }
    });
});



exports.logdata = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        if (request.param('p')) {
            var tk = request.param('p');
          
try {
  var tk2 = JSON.parse(tk); // this is how you parse a string into JSON 
 tk=tk2;
} catch (ex) {
  console.error(ex);
     response.send("500 INTERNAL ERROR 😵😵😵");
}
            var uid = tk.countryCode+Date.now().toString();
            tk['time'] = admin.database.ServerValue.TIMESTAMP;

           

                    admin.database().ref('/parameters/log/').child(uid).set(tk);



                    //////////////////

                 response.send("404");


                    //////////////
                

        } else {
            response.send("400 BAD REQUEST, check your parameters 😵😵😵");
        }
    });
});
