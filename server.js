const express = require('express');
const path = require('path');
const fs = require('fs'); /* Node JS Read + Write Module */

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

let rawdata = fs.readFileSync('data.json');

app.listen(3000, ()=> console.log('App listening on port 3000'));