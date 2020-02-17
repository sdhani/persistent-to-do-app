const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');  /* read/write */

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/* Synchronized read of data JSON */
let data = fs.readFileSync('data.json');
let todoList = JSON.parse(data); // convert to JSON
console.log(todoList);


/* Routes */
app.get('/', (req, res) => {
  res.render('todo', { todoList: todoList });
});


/* 404 Error */
app.use((req, res) => {
  res.status(404).render('404 Not Found');
  console.log('Content requested not found.');
});

app.listen(3000, ()=> console.log('App listening on port 3000'));

module.exports = app;