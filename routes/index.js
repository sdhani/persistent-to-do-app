/* routes/index.js */
const Router = require('express').Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

/* GET Landing Page */
Router.get('/', async (req, res, next) => {
  try {
    res.render('home');
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