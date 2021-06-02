const express=require('express');
const https=require('https');
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html");
   
});
app.post("/",function(req,res){
    const query=req.body.cityname;
const apikey="bda81174e7593a2eeb0441c14a4704cc";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
const weatherData=JSON.parse(data);
const temp=weatherData.main.temp;
const desp=weatherData.weather[0].description;
const icon=weatherData.weather[0].icon;
const imageurl="http://openweathermap.org/img/wn/"+icon+"@2px.png";
res.write("<h1>the temp in "+query+" is "+temp+" degree celcius</h1>");
res.write("<p>weather discripton- "+desp+"</p>");
res.write("<img src="+imageurl+"></img>");
res.send();


 })
})

    console.log("post request recive")
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
}); 