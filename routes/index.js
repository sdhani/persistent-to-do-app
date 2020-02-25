/* routes/index.js */
const Router = require('express').Router();

/* GET landing page */
Router.get('/', (req, res) => {
  res.setHeader('Set-Cookie', ['', '']);
});


Router.get('/login', (req, res) => {
  req.setHeader('Set-Cookie', [''], ['']);
});

Router.get('/users', (req, res) => {

});

/* Catch all routes that don't have an endpoint */
Router.use('*', (req, res) => {
  // res.status(200).send("Loaded server :)");
  console.log("404 Not Found");
});

module.exports = Router;