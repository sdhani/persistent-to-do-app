/* routes/users.js */
const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		const response = await axios.get(`${TODO_API_URL}/user`);
		res.status(200).render('user-list', { users: response.data });
  }
  catch(err) { console.log(err); }
});


module.exports = Router; /* export Router */