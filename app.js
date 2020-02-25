const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');  /* read/write */

const app = express();

const USERS_ROUTES =  require("./routes/users");
const INDEX_ROUTES = require("./routes/index");
const AUTH_ROUTES = require("./routes/auth");
const TODO_ROUTES = require("./routes/todos");

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", INDEX_ROUTES);
app.use("/users", USERS_ROUTES);
app.use("/auth", AUTH_ROUTES);
app.use("/todos", TODO_ROUTES);

hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

app.listen(3000, () => console.log('App listening on port 3000'));

module.exports = app;


// app.post('/login', (req, res) => {
//   console.log("req", req);
//   console.log("res", res);

//   axios.post(TODO_API_URL + '/user', {
//     username: "james"
//   });
// })

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
    
// const TODO_API_URL = 'https://hunter-todo-api.herokuapp.com';

// app.get('/users', (req, res) => {
//   axios.get(TODO_API_URL + '/user').then((res) => {
//     res.render('user-list', { users: res.data });
//   });
// });

// app.get('/users', (req, res) => {
//   axios.get(TODO_API_URL + '/user?username=james').then((res) => {
//     res.send(res.data);
//   });
// });