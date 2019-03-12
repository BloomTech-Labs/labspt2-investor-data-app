const express = require('express');
const router = express.Router();
const users = require('../data/helpers/usersModel')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../data/auth/authenticate")

/* TODO:
    Add either a route get/users and authenticate the route for
    front end use and viewing. 


*/
// Added routes for signin and authenticate the username and password for front end use. 
module.exports = router => {
    router.get("/signin", signin);
    router.get("/signin", signup);
    router.get("/:id", authenticate, userById);
}

/************************************ USERS SECTION ***********************************/
// protect this route, only authenticated users should see it
/* router.get('/', protect, (req, res) => {
    users.findUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }); */
/********* Get Users *************/
 router.get('/', (req, res) => {
    users.get()
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users could not be retrieved." });
        });
});



module.exports = router;