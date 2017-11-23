var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var fs = require("fs");


app.get('/', (req, res)=> {
  res.send("Hi.... !!");
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