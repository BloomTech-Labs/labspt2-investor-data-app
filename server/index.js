const cors = require("cors");
require("dotenv").config();
const express = require("express");
const db = require("./data/dbConfig");
const parser = express.json();
const server = express();
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const favoritesRouter = require("./routers/favoritesRouter");
const billingRouter = require("./routers/billingRouter");
const usersRouter = require("./routers/usersRouter");
const stripeRouter = require("./routers/stripeRouter");
const bodyParser = require("body-parser");
const cron = require("node-cron");
//const admin = require("./data/auth/firebaseMiddleware");
const nexmo = require("./data/nexmoConfig");
const scanner = require("./data/scanner")
server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger("tiny"));
server.use(helmet());
server.use("/api/billing", billingRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/users", usersRouter);
//server.use("/api/billing", verifyToken, billingRouter);
//server.use("/api/favorites", verifyToken, favoritesRouter);
//server.use("/api/users", verifyToken, usersRouter);
server.use("/api/stripe", stripeRouter);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//server.use("/", verifyToken);
let running = false;

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
    return res.status(401).send("You are not authorized!");
  }
} 


cron.schedule("* * * * *", () => {         // Runs it every minute ** for testing purposes **
//cron.schedule("0 18 * * *", () => {     // Run it everyday at 6pm USE THIS FOR DEPLOYMENT !!!!

  if (!running) {
    // check if app is running already
    console.log(`scanner started`);
    running = true;
    scanner();
  }
});

// Sets running to false 5 mins after the other cron is started
cron.schedule("5 18 * * *", () => {    // Run it everyday at 6:05 pm USE THIS FOR DEPLOYMENT !!!!
  //cron.schedule("0 18 * * *", () => {     
  console.log(`running is false`);
  running = false;
});


//Server response get '/'
server.get("/", async (req, res) => {
  await res
    .status(200)
    .json({ response: "PICKEM Investor-Data App Successfully Launched" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
