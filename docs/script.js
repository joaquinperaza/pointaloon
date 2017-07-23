$("#button").click(function () {
    var query = document.getElementById("email").value;
    $.ajax({
        url: "https://us-central1-pointaloon.cloudfunctions.net/createToken?email=" + query,
        jsonp: "callback",
        datatype: "jsonp",
        data: {
            q: "select stuff",
            format: "json"
        },
        success: function (data) {
            if (data.token) {
                document.getElementById("token").innerHTML = "🎈Happy tracking!🎈 Token: " + data.token;
                $("#button").prop("disabled", true);
            } else {
                document.getElementById("token").innerHTML = "Something went wrong 😅";
            }

            //some array
        }
    });

});


var image;

var map;
var markers = [];


function redraw() {

    var markers2 = [];

    $.ajax({
        url: "https://us-central1-pointaloon.cloudfunctions.net/loons?t=map",
        jsonp: "callback",
        datatype: "jsonp",
        data: {
            q: "select stuff",
            format: "json"
        },
        success: function (data) {
            var iloons = data;
            //some array


            for (iloon in iloons) {

                markers2.push(new google.maps.Marker({
                    position: {
                        lat: iloons[iloon]['lat'],
                        lng: iloons[iloon]['lng']
                    },
                    map: map,
                    icon: image,
                    optimized: false
                }));

            }

            setMapOnAll(null);
            markers = [];
            markers = markers2;
            markers2 = [];



        }
    });






}


function initMap() {
    image = {
        url: 'https://pointaloon.firebaseapp.com/gif/loon.gif'

    };


    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#727273"
      }
    ]
  },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
      }
    ]
  },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
      }
    ]
  },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
      }
    ]
  },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#88b0d8"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#7bb4b8"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#676768"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
      }
    ]
  },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
      }
    ]
  },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#707071"
      }
    ]
  },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#b1b0b2"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#7c96b8"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
      }
    ]
  }
]
    });


    $.ajax({
        url: "https://us-central1-pointaloon.cloudfunctions.net/loons?t=map",
        jsonp: "callback",
        datatype: "jsonp",
        data: {
            q: "select stuff",
            format: "json"
        },
        success: function (data) {
            var iloons = data;
            //some array
            var bounds = new google.maps.LatLngBounds();

            for (iloon in iloons) {

                markers.push(new google.maps.Marker({
                    position: {
                        lat: iloons[iloon]['lat'],
                        lng: iloons[iloon]['lng']
                    },
                    map: map,
                    icon: image,
                    optimized: false
                }));


                bounds.extend({
                    lat: iloons[iloon]['lat'],
                    lng: iloons[iloon]['lng']
                });


            }


            map.fitBounds(bounds);
        }
    });




    var updater = setInterval(redraw, 50000);



}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
