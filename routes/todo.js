const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.get("/", async (req, res, next) => {
	try {
		if (req.signedCookies.Authentication === undefined) {
      res.status(401).send("Error. User not authenticated.");
		} else {
			const list = await axios.get(`${TODO_API_URL}/todo-item`, {
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				}
			});
			res.status(200).render("todo", { todoList: list.data.filter(x=> !x.deleted) });
		}
  } 
  
  catch (err) {
		if (err.list.status === 404) {
			res.status(404).render("todo", { todoList: [] });
		}
		console.log(err);
	}
});

Router.get("/:id", async (req, res, next) => {
	try {
		if (req.signedCookies === undefined) {
      res.status(401).send("user not logged in?");
		} else {
			const list = await axios.get(`${TODO_API_URL}/todo-item/${req.params.id}`,
				{
					headers: {
						Cookie: `token=${req.signedCookies.Authentication}`
					}
				}
			);
			console.log(list.data);
			res.status(200).render("todo", { todoList: list.data });
		}
  } 
  catch (err) { console.log(err); }
});

Router.post("/", async(req, res, next)=>{
	try {
		if (req.signedCookies.Authentication === undefined) {
      res.status(401).send("user not logged in?");
		} else {
			await axios({
				method: "POST",
				url: `${TODO_API_URL}/todo-item`,
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				},
				data: {
					content: req.body.content
				}
			});
			res.status(200).redirect("/todo");
		}
	} catch (err) {
		console.log(err);
	}
});


Router.post("/:id/update", async(req,res,next)=>{
	try {
		if (req.signedCookies === undefined) {
      res.status(401).send("Error. User not authenticated.");
		} else {
			await axios({
				method: "PUT",
				url: `${TODO_API_URL}/todo-item/${req.params.id}`,
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				},
				data: {
					completed: req.body.completed === "Done"
				}
			});
			res.status(200).redirect("/todo");
		}
  } 
  catch (err) {	console.log(err); }
});

Router.get("/:id/delete", async(req,res,next)=>{
	try {
		if (req.signedCookies === undefined) {
      res.status(401).send("Error. User not authenticated.");
		} else {
			await axios.delete(`${TODO_API_URL}/todo-item/${req.params.id}`, {
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				}
			});
			res.status(200).redirect("/todo");
		}
  } 
  catch (err) {	console.log(err); }
});

module.exports = Router;