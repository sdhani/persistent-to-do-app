const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

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


/* GET Logout User  | Requires a Refresh to Update Cookies, redirect is not sufficient */
Router.get('/logout', async(req, res, next) => {
  try {
    res.clearCookie('Authentication');
    console.log('Logged Out :)');
    res.status(200).redirect('login');
  }
  catch (err) { console.log(err); }
});

module.exports = Router;