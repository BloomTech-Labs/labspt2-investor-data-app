const express = require('express');
const router = express.Router();
const users = require('../data/helpers/usersModel')




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

/************* Register User *************/
router.post('/signup', (req, res) => {
    const user = req.body;
    console.log("user:", user)
    user.password = bcrypt.hashSync(user.password, 10);
    users.insert(user)
        .then(user => {
            const token = generateToken(user)
            res.status(201).json({ id: user.id, token });

            // res.status(201)
            //    .json(user)

            //.then(ids => {
            // users.findById(ids[0])
            //  users.get(ids[0])
            //  .then(user => {
            //  const token = generateToken(user)
            // res.status(201).json({id: user.id, token});
            //   res.status(201).json({id: user.id});
            // });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
/************* Login User *************/
router.post('/signin', (req, res) => {
    const creds = req.body;
    users.findByUseremail(creds.email)
        .then(user => {
            // username valid   hash from client == hash from db
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user)
                // redirect
                res.json({ id: user.id, token });
            } else {
                // we send back info that allows the front end 
                // to display a new error message
                res.status(404).json({ err: "invalid username or password" });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//*************************************************** */
router.post('/signout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('failed to sign out');
        } else {
            res.send('signout successful');
        }
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
router.put('/:id', (req, res) => {
    const { id } = req.params
    const newUser = req.body

    if (!newUser.username || !newUser.password) {
        res
            .status(400)
            .json({ message: "Please provide name and password." });
    } else {

        if (newUser) {
            users.update(id, newUser)
                .then(user => {
                    if (user) {
                        res
                            .status(201)
                            .json(user);
                    } else {
                        res
                            .status(404)
                            .json({ message: "The user with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The user could not be modified." });
                });
        } else {
            res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
        }
    }
})





module.exports = router;

