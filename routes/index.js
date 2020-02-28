/* routes/index.js */
const Router = require('express').Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

/* GET landing page */
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


/* Render login page */
Router.get('/login', async (req, res, next) => {
  try { res.render('login'); } 
  catch (err) { console.log(err); }
});


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


Router.get('/logout', async(req, res, next) => {
  try {
    res.clearCookie('Authentication');
    res.clearCookie('userData');
    res.status(200).redirect('/');
    console.log('Logged Out :)');
  }
  catch (err) { console.log(err); }
});


/* Render register-user page */
Router.get('/register', async (req, res, next) => {
  try { res.render('register-user'); } 
  catch (err) { console.log(err); }
});


/* Register user */
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


Router.get('/todo', async (req, res, next) => {
  const token = req.cookies['Authentication'];
  try{
    const response = await axios.get(`${TODO_API_URL}/todo-item`, { 
      headers: {
        Cookie: `token=${token}`
      }
    });

    res.status(200).render("todo", { todoList: response.data });
  }
  catch (err) { console.log(err); }
  
});


module.exports = Router;