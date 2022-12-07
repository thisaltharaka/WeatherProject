const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){


  const query = req.body.cityName;
  const apiKey = "4110678cd2e98c66c07b70df2a133cf8";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+" "";

  https.get(url, function(response){

  console.log(response.statusCode);

  response.on("data", function(data){

  const weatherData = JSON.parse(data);

  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const weatherIconUrl = "http://openweathermap.org/img/wn/"+ icon +".png";
  console.log(temp);
  console.log(weatherDescription);
  res.write("<h1>The temperature in "+query+" is "+temp+" Kelvin</h1>");
  res.write("<p>Weather is currently "+ weatherDescription + "</P>");
  res.write( "<img src= "+ weatherIconUrl+">");
  res.send();
  });

  });


});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
