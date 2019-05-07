const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";
const billing = require("../data/helpers/billingModel");

module.exports = router => {
  router.get("/:uid", userById);
  router.put("/:uid", update);
  router.get("/:id/:acct", userByAcct);
};

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.body.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(401).send("You are not authorized!");
    }
  } catch (e) {
    return res.status(401).send("You are no authorized!");
  }
}
// /************************************ USERS SECTION ***********************************/

// function protect(req, res, next) {
//     const token = req.headers.authorization;

//     jwt.verify(token, secret, (err, decodedToken) => {
//         if (err) {
//             res
//                 .status(401)
//                 .json({ message: 'Invalid token' });
//         } else {
//             next();
//         };
//     });
// };

// //************************************************** */
// function generateToken(user) {
//     const payload = {
//         user: user.id
//     };
//     const options = {
//         expiresIn: '1h'
//     };
//     return jwt.sign(payload, secret, options);
// };

/********* Get Users *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/', protect, (req, res) => {
router.get("/", (req, res) => {
  users
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." });
    });
});

/****** Add a User ******/
// UN-COMMENT TO PROTECT THE ROUTE!
// router.post('/', protect, (req, res) => {
router.post("/", (req, res) => {
  const user = req.body;
  // check if user in database has the same email as user logging in. Go ahead and log the user in
  users.checkEmail(user.email).then(addUser => {
    if (addUser.length) {
      //    const token = generateToken(user)
      //    res.status(201).json({ id: user.id, token });
      res.status(200).json({ message: "Logged In Successfully" });
    } else {
      users
        .insert(user)
        .then(user => {
          res.status(201).json({ id: user.id });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  });
});

// Get the user associated with billing account
router.get("/:id/:acct", async (req, res) => {
  const { acct } = req.params;
  const { id } = req.params;
  await users.getById(id).then(id => {
    if (id) {
      billing.checkAcctType(acct).then(type => {
        if (acct === id.uid) {
          res.status(200).json(type);
        } else {
          res.status(500).json({
            message: "The account is not associated with that billing account"
          });
        }
      });
    }
  });
});

/********* Get Single User *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:uid', protect, (req, res) => {
router.get("/:uid", (req, res) => {
  const { uid } = req.params;
  users
    .getByUid(uid)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified user ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved." });
    });
});

/************* Update User *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.put('/:uid', protect, (req, res) => {
router.put("/:uid", (req, res) => {
  const { uid } = req.params;
  const changes = req.body;
  users
    .update(uid, changes)
    .then(count => {
      if (count) {
        users
          .getByUid(uid)
          .then(user => {
            // If user's settings have been updated, return the updated user settings.
            res.status(201).json(user);
          })
          .catch(err => {
            // Return an error if there's an error retrieving that current settings.
            res.status(500).json({
              message: "There was an error retrieving the current settings."
            });
          });
      } else {
        // If user does not exist, return 404 error.
        res.status(404).json({
          message: "The user with the specified user ID does not exist."
        });
      }
    })
    .catch(err => {
      // If there's an error in the helper method or database, return a 500 error.
      res.status(500).json({
        message: `The user's settings could not be updated at this time.`
      });
    });
});

/************* Delete User *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.delete('/:uid', protect, (req, res) => {
router.delete("/:uid", (req, res) => {
  const { uid } = req.params;
  if (uid) {
    users
      .remove(uid)
      .then(user => {
        if (user) {
          res.json({ message: "The user was successfully deleted." });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The user could not be removed." });
      });
  } else {
    res.status(400).json({ error: "No user ID was provided." });
  }
});

module.exports = router;
