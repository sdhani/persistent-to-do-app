/* routes/todo.js */
const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.get('/', async (req, res, next) => {
	const { Authentication } = req.cookies;
	if(Authentication) {
		try {
			const response = await axios.get(`${TODO_API_URL}/todo-item`, { 
				headers: {
					Cookie: `token=${Authentication}`
				}
			});
			res.status(200).render('todo', { todoList: response.data });
		}
		catch (err) { console.log(err); }

	} else {
		res.render('error');
	}
});


/* GET Todo-Item By ID */
Router.get('/:id', async (req, res, next) => {
	const { Authentication } = req.cookies;
	try {
		const response = await axios.get(`${TODO_API_URL}/todo-item/${req.params.id}`, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).json(response.data);
	}
	catch (err) { console.log(err); }
});



/* POST New Todo-Item */
Router.post('/', async(req, res, next) => {
	const { Authentication } = req.cookies;
	const { content } = req.body;
	try {
		const response = await axios.post(`${TODO_API_URL}/todo-item`, { content: content }, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).redirect('/todo');
	}
	catch (err) { console.log(err); }
});

module.exports = Router;

