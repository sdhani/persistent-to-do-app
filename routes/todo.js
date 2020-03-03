/* routes/todo.js */
const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.get('/', async (req, res, next) => {
	const { Authentication } = req.cookies;
	try {
		const response = await axios.get(`${TODO_API_URL}/todo-item`, { 
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).render('todo', { todoList: response.data });
	}
	catch (err) { 
		/* Username TBA */
		if(Authentication !== undefined){
			res.render('todo', { 
				message: ':O Oh no, you have nothing to-do! Add something to-do below.'
			}); 
		}else{
			res.render('todo', { 
				message: 'Tsk Tsk Tsk. It looks like your not signed in. Not. Cool. Bro.'
			}); 
		}
	}
});


/* POST New Todo-Item */
Router.post('/', async(req, res, next) => {
	const { Authentication } = req.cookies;
	const { content } = req.body;
	try {
		const response = await axios.post(`${TODO_API_URL}/todo-item`, { content }, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).redirect('/todo');
	}
	catch (err) { console.log(err); }
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


/* PUT Completed Status */
Router.post('/:id/update', async (req, res) => {
	const { Authentication } = req.cookies;
	const { status, content } = req.body;

	console.log(status);
		try {
			/* Switched format for Auth access */
			await axios({
				method: "PUT",
				url: `${TODO_API_URL}/todo-item/${req.params.id}`,
				headers: {
					Cookie: `token=${Authentication}`
				},
				data: {
					completed: status === "true"
				}
			});

			res.status(200).redirect('/todo');
	
		}
		catch (err) { 
			res.render('todo', { 
				message: `OH NO! :O Something went wrong... :/ ${err}`
			});
		}
});


/* DELETE Todo-Item */
Router.post('/:id/delete', async(req, res) => {
	const { Authentication } = req.cookies;

	try{
		await axios.delete(`${TODO_API_URL}/todo-item/${req.params.id}`, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).render('todo', {
			message: `Item#${req.params.id} has been successfully deleted.`
		});
	} 
	catch (err) {
		res.render('todo', {
			message: `OH NO! Looks like you will never be able to delete this to-do item!!! :O`
		});
	}

});

module.exports = Router;

