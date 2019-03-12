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
  const newBills = req.body;
  if (
    !newBills.street ||
    !newBills.city ||
    !newBills.state ||
    !newBills.country ||
    !newBills.zipcode ||
    !newBills.mailingStreet ||
    !newBills.mailingCity ||
    !newBills.mailingState ||
    !newBills.mailingZipcode ||
    !newBills.ccn ||
    !newBills.expireMonth ||
    !newBills.expireYear ||
    !newBills.code ||
    !newBills.monthlyBill ||
    !newBills.accountStatus ||
    !newBills.users_id ||
    !newBills.targetsUsed
  ) {
    res.status(400).json({
      message:
        "Please provide full street address, full mailing address, credit card number, expires month & year, security code, monthly bill amount, account status, user_id and # of targets used."
    });
  } else {
    if (newBills) {
      billing
        .update(id, newBills)
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
          res.status(500).json({ error: "The bill could not be modified." });
        });
    } else {
      res.status(404).json({
        message: "The bill with the specified ID does not exist."
      });
    }
  }
});

/********* Create New Bill *************/
router.post("/", (req, res, next) => {
  const bills = req.body;
  if (
    bills.street &&
    bills.city &&
    bills.state &&
    bills.country &&
    bills.zipcode &&
    bills.mailingStreet &&
    bills.mailingCity &&
    bills.mailingState &&
    bills.mailingZipcode &&
    bills.ccn &&
    bills.expireMonth &&
    bills.expireYear &&
    bills.code &&
    bills.monthlyBill &&
    bills.accountStatus &&
    bills.users_id &&
    bills.targetsUsed
  ) {
    bills
      .insert(bills)
      .then(bills => {
        res.status(201).json(bills);
      })
      .catch(err => {
        res.status(500).json({ message: "failed to insert bill in db" });
      });
  } else {
    res
      .status(400)
      .json({
        message:
          "missing full street address, full mailing address, credit card number, expires month & year, security code, monthly bill amount, account status, user_id and/or # of targets used.."
      });
  }
});

module.exports = router;
