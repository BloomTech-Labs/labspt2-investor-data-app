const express = require("express");
const router = express.Router();
const billing = require("../data/helpers/billingModel");

/************************************ BILLING SECTION ***********************************/

/********* Get Billing *************/
router.get("/", async (req, res) => {
  await billing
    .get()
    .then(bills => {
      res.json(bills);
    })
    .catch(err => {
      res.status(500).json({ error: "The billing could not be retrieved." });
    });
});

/********* Get Single Bill *************/
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await billing
    .get(id)
    .then(bills => {
      if (bills) {
        res.json(bills);
      } else {
        res
          .status(404)
          .json({ message: "The bill with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The bill information could not be retrieved." });
    });
});

/************* Delete Bill *************/
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    billing
      .remove(id)
      .then(bills => {
        if (bills) {
          res.json({ message: "The bill was successfully deleted" });
        } else {
          res.status(404).json({
            message: "The bill with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The bill could not be removed." });
      });
  }
});

/********* Update Billing *************/
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newBill = req.body;
  if (
    !newBill.street ||
    !newBill.city ||
    !newBill.state ||
    !newBill.country ||
    !newBill.zipcode ||
    !newBill.mailingStreet ||
    !newBill.mailingCity ||
    !newBill.mailingState ||
    !newBill.mailingZipcode ||
    !newBill.ccn ||
    !newBill.expireMonth ||
    !newBill.expireYear ||
    !newBill.code ||
    !newBill.monthlyBill ||
    !newBill.accountStatus ||
    !newBill.users_id ||
    !newBill.targetsUsed
  ) {
    res.status(400).json({
      message:
        "Please provide full street address, full mailing address, credit card number, expires month & year, security code, monthly bill amount, account status, user_id and # of targets used."
    });
  } else {
    if (newBill) {
      billing
        .update(id, newBill)
        .then(bills => {
          if (bills) {
            res.status(201).json(bills);
          } else {
            res.status(404).json({
              message: "The bill with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "The bill could not be modified." });
        });
    } else {
      res.status(404).json({
        message: "The bill with the specified ID does not exist."
      });
    }
  }
});



module.exports = router;
