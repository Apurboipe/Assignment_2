var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var fs = require("fs");
var mongojs = require('mongojs');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org');
var db = mongojs("mongodb://assignment_2:12345678@ds155325.mlab.com:55325/firstdb",['sensorData']);

var data={"data1":1,"data2":2};
//MQTT 
client.on('connect', function () {
  client.subscribe('asensor');
  client.publish('asensor', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  console.log(message.toString());
  var saveObject = {"msg": message};
  db.sensorData.save(saveObject);
 });

// Get all data from mongodb 
app.get('/', (req, res)=> {
  db.sensorData.find((err,docs)=>{
    res.send(docs) ;
  })
});
// post using postman body
app.post('/post',(req,res)=>{
  db.sensorData.save(req.body);
  res.json(req.body);
});
// post using data in program
app.post('/data',(req,res)=>{
  db.sensorData.save(data); 
  res.send("Posting");
});

app.get('/Temp', (req, res)=> {
  res.send("Hi Temp .... !!");
});

app.get('/Light', (req, res)=> {
  res.send("Hi Light.... !!");
});

app.get('/Sound', (req, res)=> {
  res.send("Hi Sound.... !!");
});


app.listen(3000,()=>{
    console.log("listening to 3000 port");
  });