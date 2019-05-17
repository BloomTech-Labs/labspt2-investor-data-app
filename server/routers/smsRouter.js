const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
const billing = require("../data/helpers/billingModel");
const favorites = require("../data/helpers/favoritesModel");

router.get("/users", async (req, res) => {
   await users
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." });
      });
  });

  router.get("/billing", async (req, res) => {
    await billing
      .get()
      .then(bill => {
        res.status(200).json(bill);
      })
      .catch(err => {
        res.status(500).json({ error: "The billing could not be retrieved." });
      });
  });

  router.get("/favorites", async (req, res) => {
    await favorites
      .get()
      .then(favorite => {
        res.status(200).json(favorite);
      })
      .catch(err => {
        res.status(500).json({ error: "The favorites could not be retrieved." });
      });
  });


  module.exports = router;