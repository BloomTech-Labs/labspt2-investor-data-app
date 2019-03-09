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
<<<<<<< HEAD
=======
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
>>>>>>> 4887b40523fd620dc95f54d97ffb9d0f3285c9fc
});






module.exports = router;

