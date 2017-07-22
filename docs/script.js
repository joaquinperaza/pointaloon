
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-67253903-5', 'auto');
  ga('send', 'pageview');

$( "#target" ).click(redraw);


          var image = {
          url: 'https://pointaloon.firebaseapp.com/loon.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
      

var map;
    var markers = [];
 

function redraw() {
      setMapOnAll(null);
    markers = [];
         
          $.ajax({
url: "https://us-central1-pointaloon.cloudfunctions.net/loons?t=map",
jsonp: "callback",
datatype: "jsonp",
data: {q: "select stuff", format: "json"},
success: function(data) {
        var iloons = data;
 //some array
var bounds = new google.maps.LatLngBounds();
    
     for (iloon in iloons) {
         
          markers.push(new google.maps.Marker({
            position: {lat: iloons[iloon]['lat'], lng: iloons[iloon]['lng']},
            map: map,
            icon: image})
                      );
         
         
         bounds.extend({lat: iloons[iloon]['lat'], lng: iloons[iloon]['lng']});
      
         
     }


map.fitBounds(bounds);
   }
}); 
          
      
    
    
    
  
}


      function initMap() {
          
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
data: {q: "select stuff", format: "json"},
success: function(data) {
        var iloons = data;
 //some array
var bounds = new google.maps.LatLngBounds();
    
     for (iloon in iloons) {
         
          markers.push(new google.maps.Marker({
            position: {lat: iloons[iloon]['lat'], lng: iloons[iloon]['lng']},
            map: map,
            icon: image})
                      );
         
         
         bounds.extend({lat: iloons[iloon]['lat'], lng: iloons[iloon]['lng']});
      
         
     }


map.fitBounds(bounds);
   }
}); 
          
       
 

    var updater = setInterval(redraw, 10000);
      
      
      
      }

   function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
  
