const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.post("/login", async(req,res,next)=>{
	try {
		const res = await axios.post(`${TODO_API_URL}/auth`, {
			username: req.body.username
		});

		res.cookie("Authentication", res.data.token, {
			signed: true,
			httpOnly: true
		});

		res.cookie("userData", req.body.username, {
			signed: true,
			httpOnly: true
		});

		// res.render('login', {user: res.body.username});
		res.status(200).redirect("/");
  } 
  catch (err) { console.log(err); }
});


Router.get("/logout", async(req,res,next)=>{
	try {
		res.clearCookie("Authentication"); // delete cookie
		res.clearCookie("userData");
		res.status(200).redirect("/");
		console.log("logout successfully");
  } 
  catch (err) { console.log(err); }
})

module.exports = Router;