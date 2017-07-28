# [Point a Loon](http://pointaloon.com)  

We highly believe that project Loon implementation can be greatly improved by using directional LTE atennas so we developed a Loon tracker and antenna tracker, with this you can get a DIY antenna tracker following the nearest balloon to your location, further improvemnts comming! 
Our software is open-source, so you can host your own loon tracker; however, we have deployed a public API to ease this system implementation.

### API Usage
The API we provide is hosted at Google Firebase, remember you need to create an API token first.  

##### Create API Token 

Create API token for using Google Loon antenna tracker API.  

[Create in our website!](http://pointaloon.com)  


/createToken GET Request  
<https://data.pointaloon.com/createToken?email=mymail@mydomain.com>  
  

Parameters required:  
- email=mail to bind with the new token.  

Response: JSON with registered mail and assigned token.  

Example:  
`{"token":"-Kp_R2BLaamqXTruCE-o","email":"youremail@domain.com"}`  

Tokens without activity in a long time period will be deleted, calling /point periodically will prevent that.

##### Point Antenna
/point GET Request  
<http://data.pointaloon.com/point?t=-KpXzvOkApAjugM8GgWe&lat=-5.4&lng=-80.7&alt=75>  

Parameters required: 
- t=API token  
- lat=latitude of antenna location  
- lng=longitude of antenna location  
- alt= height in meters above sea level from antenna location  

Response: JSON with desired azimuth and altitude data for atenna in degrees, distance to the nearest balloon, and object Loon with balloon data (callsign,altitude,speed,postion,track,etc).  

Example:  
`{"ant_alt":-13.044651036040841, "ant_azm":314.3787496140375, "distance":2966056.5460053235, "loon":{"alt":15788.639494763536, "lat":-11.8075,"lng":-76.2704, "name":"HBAL941","seen":1500638350, "speed":15,"track":121}  
}`  
This also will update your token last activity. 
For initial postioning you need to have a minimal connection to the network, the request size is as little as 500 bytes of data.  

##### Get live Loon balloons status
/loons GET Request  

<https://data.pointaloon.com/loons?t=-KpXzvOkApAjugM8GgWe>  

Parameters required: 
- t=API token  

Response: JSON with all objects Loon detected, each object include callsign,altitude,speed,postion,track,etc from balloon.  
This also will update your token last activity. 

Example:  
`{"HBAL020":{"alt":16093.439485009936,"lat":-6.3734,"lng":-78.456,"name":"HBAL020","seen":1500760514,"speed":7,"track":203}, "HBAL044":{"alt":17708.87943331586,"lat":-3.6557,"lng":-61.919,"name":"HBAL044","seen":1500760515,"speed":16,"track":119}, "HBAL051":{"alt":15819.119493788176,"lat":-0.478,"lng":37.6499,"name":"HBAL051","seen":1500760511,"speed":6,"track":270}...
}`  
This also will update your token last activity.  

##### Force-update Loon data  
~~/update GET Request~~  
~~http://data.pointaloon.com/update~~   
Refresh balloons database from flightradar24.com 
Deprecated since our server call it automatically.

### Further improvements:
- Arduino code for a DIY Loon tracker
- Guide for a simple Loon antenna tracker with Arduino
- Hardware BOM suggestion
- Ready to use solution kit

### Thanks to:
- Flightradar24.com // Loon data provider
- Don Cross's Azimuth/Distance Calculator // Geodesical calculations package
- Google Project Loon Team for their amazing work

### Disclaimer
We are neither part nor supported by Google Project Loon; furthermore, we are pleased to work with everyone.

### Contributors 
Any contribution will be welcommed 

### Website  
[Point a Loon](http://pointaloon.com)  


