# PointALoon


### Open-source solucion for Google Project Loon Optimization
We highly believe that project Loon implementation can be gratly improved by using directional LTE atennas so we developed a Loon tracker and antenna calculator, with this you can get a DIY antenna tracker following the nearest baloon to your location, future improvemnts comming!

### API Usage
Our API is hosted at Google Firebase

https://us-central1-pointaloon.cloudfunctions.net/point?t=-KpXzvOkApAjugM8GgWe&lat=-5.4&lng=-80.7&alt=75
/point
GET with atenna position data

Parameters
t=token
lat=latitude
lng=longitude
alt= altitude above sea level

Response: azimuth and altitude data for atenna in degrees, distance to the nearest baLoon, and object Loon with baloon data like (callsign,altitude,speed,postion,track,etc)

https://us-central1-pointaloon.cloudfunctions.net/updater
/updater 
Refresh baloons database

https://us-central1-pointaloon.cloudfunctions.net/createToken?email=mymail@mydomain.com
/createToken
Create API token for using Google Loon antenna tracker API, tokens without activity a long time period will be deleted
Parameters:
email=mail to bind with your token.

Response: JSON with registered mail and assigned token.

### Futher improvements:
-Arduino code for a simple atenna tracker solution.
-Hardware BOM suggestion
-Ready to use solution kit


### Thanks to:
- Flightradar24.com // Loon data provider
- Don Cross's Azimuth/Distance Calculator // Geodesical calculations package

### Programmed by:
Joaquin Peraza - joaquin@peraza.uy


