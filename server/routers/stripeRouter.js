const express = require("express");
const router = express.Router();
const stripe = require("../constants/stripe");

router.post("/", (req, res) => {
  stripe.customers.create(
    {
      source: req.body.source,
      email: req.body.email
    },

    function(err, customer) {
      if (err) {
        res.send({
          success: false,
          message: "Error"
        });
      } else {
        res.send({
          success: true,
          message: "Success"
        });
      }
      stripe.subscriptions.create({
        customer: customer.id,
        plan: req.body.plan
      });
    }
  );
});

module.exports = router;
