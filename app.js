const express = require('express');
const path = require('path');
const fs = require('fs'); /* Node JS Read + Write Module */
const hbs = require('handlebars');

const app = express();

let data = fs.readFileSync('data.json');
let todoList = JSON.parse(data); // convert to JSON
console.log(todoList);

/* Paths */
app.set('templates', path.join(__dirname, 'templates'));

/* Routes */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


/* 404 Error */
app.use((req, res) => {
  res.status(404).render('404 Error');
});

app.listen(3000, ()=> console.log('App listening on port 3000'));

module.exports = app;