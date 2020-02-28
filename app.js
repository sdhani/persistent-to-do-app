const express = require('express');
const exphbs = require('express-handlebars'); /* optimized handlebars for nodejs/express */
const cookieParser = require('cookie-parser'); /* parse cookie res */
const bodyParser = require('body-parser'); /* parse res body */
const logger = require('morgan'); /* dev tools */
const fs = require('fs');  /* read/write */

const app = express();

/* Routes */
const INDEX_ROUTES = require("./routes/index");
// const AUTH_ROUTES = require("./routes/auth");
// const USERS_ROUTES =  require("./routes/users");
// const TODO_ROUTES = require("./routes/todo");

/* Set view */
app.engine('hbs', exphbs({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   const authToken = req.cookies('Authentication');
//   req.user = authToken;
//   next();
// });

app.use(logger("dev")); /* Use dev tools */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); /* Parse cookie */

app.use("/", INDEX_ROUTES);
// app.use("/auth", AUTH_ROUTES);
// app.use("/users", USERS_ROUTES);
// app.use("/todo", TODO_ROUTES);

app.listen(3000, () => console.log('App listening on port 3000'));

module.exports = app;