
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-67253903-5', 'auto');
  ga('send', 'pageview');





var map;
      function initMap() {
          
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      
          var image = {
          url: 'https://pointaloon.firebaseapp.com/loon.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
      
       
      
      function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

getJSONP('https://us-central1-pointaloon.cloudfunctions.net/loons?t=map&callback=?', function(data){
       var iloons = JSON.parse(data);
    
     for (iloon in iloons) {
         
          var marker = new google.maps.Marker({
            position: {lat: iloons[iloon]['lat'], lng: iloons[iloon]['lng']},
            map: map,
            icon: image
            
           
          });
      
         
     }
    
    
});  

   
      
      
      
      }
