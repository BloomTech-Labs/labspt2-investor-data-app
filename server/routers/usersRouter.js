const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
//const axios = require("axios");
const jwt = require('jsonwebtoken');
const secret = 'shhhisthisasecret';
const billing = require('../data/helpers/billingModel')
module.exports = router => {
    router.get("/:id", userById);
    router.put("/:id", update);
}

/************************************ USERS SECTION ***********************************/
function protect(req, res, next) {
    const token = req.headers.authorization;

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token' });
        } else {
            next();
        }
    });
}

//************************************************** */
function generateToken(user) {
    const payload = {
        user: user.id,
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
}

/********* Get Users *************/
router.get('/', (req, res) => {
    //router.get("/", (req, res) => {
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
    // check if user in database has the same email as user loging in. Go ahead and log the user in
    users.checkEmail(user.email).then(addUser => {
        if (addUser.length) {
            const token = generateToken(user)
            res.status(201).json({ id: user.id, token });
            res.status(200).json({message: "Logged In Successfully"})
        } else {
            users.insert(user)
                .then(user => {
                    const token = generateToken(user)
                    res.status(201).json({ id: user.id, token });
                    // res.status(201).json(user)
                })
                .catch(err => {
                    res.status(500).send(err)
                })

        }
    })

})


router.get('/:id/:acct', async (req, res) => {
    const {acct} = req.params;
    const {id} = req.params
   
    await users.getById(id).then(id => {
        if(id){
            billing.checkAcctType(acct).then(type =>{
                if(acct === id.uid){
                    res.status(200).json(type)
                }
                else {
                    res.status(500).json({message: "The account is not associated with that billing account"})
                }
            })
        }
    })
  });

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.getById(id)
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
                            .json({ message: 'There was an error retrieving the current settings.' });
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
                .json({ message: `The user's settings could not be updated at this time.` });
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



module.exports = router;
