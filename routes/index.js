/* routes/index.js */
const Router = require('express').Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

/* GET Landing Page */
Router.get('/', async (req, res, next) => {
  try {
    let curr_user =
      req.signedCookies.user !== undefined
        ? req.signedCookies.user
        : "Not Logged In";
    res.render('home');
  } 
  catch (err) { console.log(err); }
});


/* GET Login Page */
Router.get('/login', async (req, res, next) => {
  try { res.render('login'); } 
  catch (err) { console.log(err); }
});


/* POST Login User */
Router.post('/login', async (req, res, next) => {
  const { username } = req.body;
  try{
    const userToken = await axios.post(`${TODO_API_URL}/auth`, {
      username : username
    });
    res.cookie('Authentication', userToken.data.token, { httpOnly: true });
    res.status(200).json(userToken.data);
  }
  catch (err) { console.log(err); }
});


/* GET Logout User */
Router.get('/logout', async(req, res, next) => {
  try {
    res.clearCookie('Authentication');
    res.clearCookie('userData');
    res.status(200).redirect('/');
    console.log('Logged Out :)');
  }
  catch (err) { console.log(err); }
});


/* GET Register-User Page */
Router.get('/register', async (req, res, next) => {
  try { res.render('register-user'); } 
  catch (err) { console.log(err); }
});


/* POST New User To API */
Router.post('/register', async (req, res) => {
  const { username } = req.body;
  try{
    const response = await axios.post(`${TODO_API_URL}/user`, {
      username: username
    });
    
    console.log("Registered! :D");
    res.status(200).json(response.data); /* debugging */
  }
  catch (err) { console.log(err); }
});


module.exports = Router;