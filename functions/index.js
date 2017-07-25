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
            response.send("400 BAD REQUEST, check your parameters");

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
                balloons[balloon.name] = balloon;
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
        http.request('http://data-live.flightradar24.com/zones/fcgi/feed.js?reg=!BALLOON&', callback).end();
    }
    update();


});





exports.autoUpdate = functions.database.ref('/parameters/queue')
    .onCreate(event => {

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
                    balloons[balloon.name] = balloon;
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
            http.request('http://data-live.flightradar24.com/zones/fcgi/feed.js?reg=!BALLOON&', callback).end();
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
                                var resp = {

                                    ant_alt: distances[key]['altitude'],
                                    ant_azm: distances[key]['azimuth'],
                                    distance: distances[key]['distance'],
                                    loon: iloons[key]
                                };

                                response.send(resp);
                            });


                    } else {
                        response.send("400 BAD REQUEST, check your parameters and token authenticity");
                    }
                    //////////////
                } else {
                    response.send("403 FORBIDDEN, check your token authenticity");
                }
            });

        } else {
            response.send("400 BAD REQUEST, check your parameters");
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
                    response.send("403 FORBIDDEN, check your token authenticity");
                }
            });

        } else {
            response.send("400 BAD REQUEST, check your parameters");
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
}

           

                    admin.database().ref('/parameters/log/').push().set(
                    {
                        time: admin.database.ServerValue.TIMESTAMP,
                        ip: tk
                        
                    }
                    );



                    //////////////////

                 response.send("404");


                    //////////////
                

        } else {
            response.send("400 BAD REQUEST, check your parameters");
        }
    });
});
