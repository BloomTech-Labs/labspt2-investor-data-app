const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../data/auth/authenticate");

/* TODO:
    Add either a route get/users and authenticate the route for
    front end use and viewing. 


*/
// Added routes for signin and authenticate the username and password for front end use.
module.exports = router => {
    router.get("/signin", signin);
    router.get("/signin", signup);
    router.get("/:id", userById);
    // router.get("/:id", authenticate, userById);
    router.put("/:id", update);
}

/************************************ USERS SECTION ***********************************/

/********* Get Users *************/
router.get("/", (req, res) => {
  users
    .get()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." });
    });
});
/****** Add a User ******/
router.post('/', (req, res) => {
    const user = req.body
    // check if user in database has the same email as user loging in. Log the user in
    users.checkEmail(user.email).then(addUser=>{
        if(addUser.length){
            res.status(200).json({message: "Logged In Successfully"})
        }else {
         users.insert(user)
                .then(user => {
            
                res.status(201).json(user)
                })
                .catch(err => {
                    res.status(500).send(err)
                })

        }
    })

               
    

   
})
/********* Get Single User *************/
router.get('/:uid', (req, res) => {
    const { uid } = req.params
    users.getById(uid)
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

// Update user's settings
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    users.update(id, changes)
        .then(count => {
            if (count) {
                users.getById(id)
                    .then(user => {
                            // If user's settings have been updated, return the updated user settings.
                            res
                                .status(201)
                                .json(user);
                    })
                    .catch(err => {
                        // Return an error if there's an error retrieving that current settings.
                        res
                            .status(500)
                            .json({ message: 'There was an error retrieving the current settings.'});
                    })
            }
            else {
                // If user does not exist, return 404 error.
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            // If there's an error in the helper method or database, return a 500 error.
            res
                .status(500)
                .json({ message: `The user's settings could not be updated at this time.`});
        });
});

/************* Delete User *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params
    if (id) {
        users.remove(id)
            .then(user => {
                if (user) {
                    res.json({ message: "The user was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The user could not be removed." });
            });
    }
});

/********* Update User *************/
/* router.put('/:id', (req, res) => {
    const { id } = req.params
    const newUser = req.body
    if (!newUser.email || !newUser.password || !newUser.username || !newUser.firstName || !newUser.lastName) {
        res
            .status(400)
            .json({ message: "Please provide email, first name, last name and password." });
    } else {
        if (newUser) {
            users.update(id, newUser)
                .then(user => {
                    if (user) {
                        res.status(201).json(user);
                    } else {
                        res.status(404).json({ message: "The user with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: "The user could not be modified." });
                });
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }
}) */

module.exports = router;
