/* routes/users.js */

const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.get("/", async (req, res) => {
	try {
		const curr_user = await axios.get(`${TODO_API_URL}/user`);
		res.status(200).json(curr_user.data);
  }
  catch(err) { console.log(err); }
});


Router.get("/:username", async(req,res)=>{
	try{
		const username = await axios.get(`${TODO_API_URL}/user?username=${req.params.username}`) 
		res.status(200).json(username.data);
  }
  catch(err){ console.log(err); }
});


module.exports = Router;