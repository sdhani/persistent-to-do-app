var express = require('express');
var app = express();
var path = require('path');

app.get('/', (req, res) => {
  res.send("main page");
  res.sendFile(path.join(__dirname + '/index.html'));
});


console.log('This is after the read call');

app.listen(3000, ()=> console.log('App listening on port 3000'));