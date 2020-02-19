const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const fs = require('fs');  /* read/write */

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/* Synchronized read of data JSON */
let data = fs.readFileSync('data.json');
let todoList = JSON.parse(data); // convert to JSON
console.log(todoList);



app.get('/', (req, res) => {
  res.render('home');
});

const TODO_API_URL = 'https://hunter-todo-api.herokuapp.com';

app.get('/users', (req, res) => {
  axios.get(TODO_API_URL + '/user').then((response) => {
    res.render('user-list', { users: response.data });
  });
});

app.post('/', (req, res) => {
  axios.post(TODO_API_URL + '/user').then((response) => {
    res.render('user-list', { users: response.data });
  });
});

app.get('/username', (req, res) => {
  axios.get(TODO_API_URL + '/user?username=').then((response) => {
    res.render('todo', { todo: response.data });
  });
});

/* 404 Error */
app.use((req, res) => {
  res.status(404).render('404 Not Found');
  console.log('Content requested not found.');
});

app.listen(3000, ()=> console.log('App listening on port 3000'));

module.exports = app;