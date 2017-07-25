# Wiki

## Point A Loon wiki

### Creating a token
For using our API you need a token, you can get it by two different methods, the easiest is creating at [pointaloon.com](http://pointaloon.com/), if not you can do it by /createToken GET request:  

/createToken GET Request  
<http://data.pointaloon.com/createToken?email=mymail@mydomain.com>  
  
Create API token for using Google Loon antenna tracker API. 
Parameters required:  
- email=mail to bind with the new token.  

Response: JSON with registered mail and assigned token.  

Example:  
`{"token":"-Kp_R2BLaamqXTruCE-o","email":"youremail@domain.com"}`  
Tokens without activity in a long time period will be deleted, calling /point periodically will prevent that.   
Note: to avoid CORS issues use https://us-central1-pointaloon.cloudfunctions.net/ instead of http://data.pointaloon.com/ (Due to firebase limitation allowing cors on redirects).  
### Read object loon
Object loon are the interface to provide balloon data.  
Our /loons GET Request provide a collection of loon objects from the active balloons at the sky.
 
Example:  
`{"HBAL020":{"alt":16093.439485009936,"lat":-6.3734,"lng":-78.456,"name":"HBAL020","seen":1500760514,"speed":7,"track":203}, "HBAL044":{"alt":17708.87943331586,"lat":-3.6557,"lng":-61.919,"name":"HBAL044","seen":1500760515,"speed":16,"track":119}, "HBAL051":{"alt":15819.119493788176,"lat":-0.478,"lng":37.6499,"name":"HBAL051","seen":1500760511,"speed":6,"track":270}...
}` 
Properties: 
- alt: height in meters above sea level
- lat: current latitude of the ballon
- lng: current longitude of the ballon
- name: balloon callsign
- seen: unix timestamp of data acquisition
- speed: balloon speed in knots
- track: balloon course in degrees from north

Note: to avoid CORS problem use https://us-central1-pointaloon.cloudfunctions.net/ instead of http://data.pointaloon.com/ (Due to firebase limitation allowing cors on redirects).

### Antenna pointing data
/point GET Request will return the information for connecting to the nearest balloon  

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
Note: to avoid CORS issues use https://us-central1-pointaloon.cloudfunctions.net/ instead of http://data.pointaloon.com/ (Due to firebase limitation allowing cors on redirects).  