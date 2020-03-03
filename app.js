const express = require('express');
const exphbs = require('express-handlebars'); /* optimized handlebars for nodejs/express */
const cookieParser = require('cookie-parser'); /* parse cookie res */
const bodyParser = require('body-parser'); /* middleware; parse response body */
const logger = require('morgan'); /* dev tools */
const dotenv = require('dotenv');

dotenv.config();
const app = express();

/* Routes */
const INDEX_ROUTES = require("./routes/index");
const LOGIN_ROUTES = require("./routes/login");
const TODO_ROUTES = require("./routes/todo");
const USERS_ROUTE = require("./routes/users");

/* Set view */
app.engine('hbs', exphbs({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.use(logger("dev")); /* Use dev tools */
app.use(express.urlencoded({ extended: false })); /* body-parser middleware */
app.use(cookieParser()); /* Parse cookie */

app.use("/", INDEX_ROUTES);
app.use("/login", LOGIN_ROUTES);
app.use("/todo", TODO_ROUTES);
app.use("/users", USERS_ROUTE);


app.listen(process.env.PORT);

module.exports = app; /* export app */