/* routes/index.js */
const Router = require('express').Router();

/* GET landing page */
Router.get('/', async (req, res, next) => {
    try {
      let currUser =
        req.signedCookies.user !== undefined
          ? req.signedCookies.user
          : "Not Logged In";
      res.render("index", { user: currUser });
    } catch (err) {
      console.log(err);
    }
});


// gets user form for login
Router.get("/login", async (req, res, next) => {
	try {
		res.render("login");
	} catch (err) {
		console.log(err);
	}
});

// gets user form for signup
Router.get("/register", async (req, res, next) => {
	try {
		res.render("register-user");
	} catch (err) {
		console.log(err);
	}
});

module.exports = Router;