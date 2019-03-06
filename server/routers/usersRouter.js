const express = require('express');
const router = express.Router();
const users = require('../data/helpers/usersModel')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../auth/authenticate");


/* TODO:
    Add either a route get/users and authenticate the route for
    front end use and viewing. 


*/
// Added routes for signin and authenitcate the username and password for front end use. 
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

signin = (req, res) => {
    //implementing user signin 
    const creds = req.body;
    users.get(creds.usersname)
    .then(user => {
        //Check to see is username is valid
        if(user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user)
            res.json({id: user.id, token})
        }else {
            res.status(404).json({err:"Invalid username or password"})

        }
    })
    .catch( err => res.status(500).send(err))
}

signup = (req, res) => {
 const user = req.body
 user.password = bcrypt.hashSync(user.password, 12)
   users.insert(user).then(ids => {
       users.getByUser([ids[0]])
       .then(user => {
        const token = generateToken(user);
        res.status(201).json({ id: user.id, token });
       })
       .catch(err => {
        res.status(500).send(err);
      })
   })
}

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
});






module.exports = router;

