const express = require('express');
var cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const axios = require('axios');
const fs = require('fs');  /* read/write */

const app = express();

app.use(cookieParser());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
  res.render('login');
});


let users = { 
  name : "Ritik", 
  Age : "18"
  } 


app.

app.post('/register', (req, res) => {
  var username = req.body.username;
  axios.post('https://hunter-todo-api.herokuapp.com/user', {
    username: username
  });
})

app.get('/login', (req, res) => {
  var username = req.body.username;
  res.cookie("userData", username);

  axios.get(`https://hunter-todo-api.herokuapp.com/user?username=${username}`)
  .then(console.log("user stuff", res.data));

});

app.get('/logout', (req, res) => {
  res.clearCookie('userData');
  res.send('user logout successfully');
});


app.get('/setuser', (req, res) => {
  res.cookie("userData", users);
  res.send('user data added to cookie');
});

//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
  //shows all the cookies 
  res.send(req.cookies); 
}); 
    

const TODO_API_URL = 'https://hunter-todo-api.herokuapp.com';

app.get('/users', (req, res) => {
  axios.get(TODO_API_URL + '/user').then((response) => {
    res.render('user-list', { users: response.data });
  });
});

// app.post('/', (req, res) => {
//   axios.post(TODO_API_URL + '/user', {"username": ""});
// });

// app.get('/username', (req, res) => {
//   axios.get(TODO_API_URL + '/user?username=').then((response) => {
//     res.render('todo', { todo: response.data });
//   });
// });

/* 404 Error */
app.use('*', (req, res) => {
  // res.status(200).send("Loaded server :)");
  console.log("404 Not Found");
});

app.listen(3000, () => console.log('App listening on port 3000'));

module.exports = app;

/* Synchronized read of data JSON */
// let data = fs.readFileSync('data.json');
// let todoList = JSON.parse(data); // convert to JSON
// console.log(todoList);