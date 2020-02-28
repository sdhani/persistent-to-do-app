const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";

Router.get('/', async (req, res, next) => {
  const token = req.cookies['Authentication'];
  try{
    const response = await axios.get(`${TODO_API_URL}/todo-item`, { 
      headers: {
        Cookie: `token=${token}`
      }
    });
    res.status(200).render('todo', { todoList: response.data });
  }
  catch (err) { console.log(err); }
});

/* GET Todo-Item By ID */
Router.get('/:id', async (req, res, next) => {
	try{
		const response = await axios.get(`${TODO_API_URL}/todo-item/:id`, {
			headers: {
				Cookie: `token=${token}`
			}
		});
		res.status(200).render('todo', { todoList: response.data });
	}
	catch (err) { console.log(err); }
});

module.exports = Router;