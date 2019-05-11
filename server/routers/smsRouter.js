const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
const billing = require("../data/helpers/billingModel");
const favorites = require("../data/helpers/favoritesModel");

router.get("/users", (req, res) => {
    users
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." });
      });
  });

  router.get("/billing", (req, res) => {
    billing
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." });
      });
  });

  router.get("/favorites", (req, res) => {
    favorites
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." });
      });
  });


  module.exports = router;