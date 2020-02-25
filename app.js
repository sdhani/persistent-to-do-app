const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const fs = require('fs');  /* read/write */
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  res.render('login');
})

// app.post('/login', (req, res) => {
//   console.log("req", req);
//   console.log("res", res);

//   axios.post(TODO_API_URL + '/user', {
//     username: "james"
//   });
// })


app.get('/logout', (req, res) => {
  res.clearCookie('userData');
  res.send('user logout successfully');
});


// let users = {name : "Ritik", Age : "18"} 
// app.get('/setuser', (req, res) => {
//   res.cookie("userData", users);
//   res.send('user data added to cookie');
// });

// //Iterate users data from cookie 
// app.get('/getuser', (req, res)=>{ 
//   //shows all the cookies 
//   res.send(req.cookies); 
// }); 
    

const TODO_API_URL = 'https://hunter-todo-api.herokuapp.com';

app.get('/users', (req, res) => {
  axios.get(TODO_API_URL + '/user').then((res) => {
    res.render('user-list', { users: res.data });
  });
});

app.get('/users', (req, res) => {
  axios.get(TODO_API_URL + '/user?username=james')
});

/* 404 Error */
app.use('*', (req, res) => {
  console.log("404 Not Found");
});

app.listen(3000, () => console.log('App listening on port 3000'));

module.exports = app;