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
//const nexmo = require("./data/nexmoConfig");
const Nexmo = require("nexmo");
server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger("tiny"));
server.use(helmet());
server.use("/api/billing", billingRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/users", usersRouter);
server.use("/api/stripe", stripeRouter);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//server.use("/", verifyToken);
let running = false;
const axios = require("axios");

const myPhone = "16199641367"; //*********    For testing, ENTER YOUR PHONE NUMBER HERE !!! *********

//const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET       // Could not get this to work
//const NEXMO_API_KEY = process.env.NEXMO_API_KEY             // Could not get these to work

//const NEXMO_API_SECRET =      // PUT THE SECRET HERE!!!!!!!!
//const NEXMO_API_KEY =           // PUT THE KEY HERE!!!!

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
});

/* async function verifyToken(req, res, next) {
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
} */

 // Runs it every minute ** for testing purposes **
cron.schedule("* * * * *", () => {
//cron.schedule("0 18 * * *", () => {     // Run it everyday at 6pm USE THIS FOR DEPLOYMENT !!!!
  if (!running) {
    // check if app is running already
    console.log(`sending message`);
    running = true; // Set flag to true
    Scanner();
  }
});

// Not used
/* server.post("/send", (req, res) => {
  // Send SMS
  nexmo.message.sendSms(
    config.number,
    req.body.toNumber,
    req.body.message,
    { type: "unicode" },
    (err, responseData) => {
      if (responseData) {
        console.log(responseData);
      }
    }
  );
});
 */

// BEGIN SCANNER FUNCTION
Scanner = () => {
  //let running = false;
  // const axios = require('axios');
  // const Nexmo = require('nexmo');
  const YOUR_VIRTUAL_NUMBER = "18572560178";
  const from = "18572560178";
  let userNumber = "";
  const URL = "http://localhost:5000/api"; // ********** CHANGE FOR DEPLOYMENT *************
  // const URL = "https://pickemm.herokuapp.com/api";

  getCustomers = () => {
    const customers = [];
    axios
      .get(`${URL}/billing`) // Get User Data
      .then(response => {
        //  response.data.forEach(customer => {
        //   customers.push(response.data.usersId)
        //  })
        for (let i = 0; i < response.data.length; i++) {  // ***************** USE FOR DEPLOYMENT ************
          // for (let i = 0; i < 2; i++) {
          // Step through the user data
          customers.push(response.data[i].usersId);
        }
        // Send users to the next subroutine
        getUsers(customers);
      })
      .catch(err => {
        console.log("There was an error");
      });
  };

  getUsers = customers => {
    axios
      .get(`${URL}/users`) // Get User Data
      .then(response => {
        // for (let i = 0; i < response.data.length; i++) {  // ***************** USE FOR DEPLOYMENT ************
        for (let i = 0; i < customers.length; i++) {
          // Step through the user data
          for (let j = 0; j < 4; j++) {
            // Check if user is a match to billing usersId
            if (response.data[j].uid === customers[i]) {
              // Check if receiveTexts is enabled
              if (response.data[i].receiveTexts === 1) {
                // Format the users number
                userNumber =
                  "1" +
                  response.data[j].phoneNumber.slice(0, 3) +
                  response.data[j].phoneNumber.slice(4, 7) +
                  response.data[j].phoneNumber.slice(-4); // Save the users phone number
                console.log("userNumber:", userNumber);
                getFavorites(response.data[j].uid); // Send each user to the next subroutine
              }
            }
          }
        }
      })
      .catch(err => {
        console.log("There was an error");
      });
  };

  getFavorites = uid => {
    // Get all the favorites for each this user
    let companies = [];
    axios
      .get(`${URL}/favorites`) // User favorites
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          // Step through the favorites data
          if (response.data[i].uid === uid) {
            // Check for a match to the user uid
            companies.push(response.data[i].symbol); // Add each symbol to companies array
          }
        }
        console.log("companies:", companies);
        getStocks(companies); // Send the companies to next subroutine
      })
      .catch(err => {
        console.log("There was an error");
      });
  };

  getStocks = companies => {
    let promises = companies.map((company) =>
      axios.get(`https://www.alphavantage.co/query?function=MACD&symbol=${company}&interval=daily&series_type=open&apikey=TFUONSVQ3ZDFXFPG`));

    let timeStamp;
    let x = false;
    let y = false;

    axios
      .all(promises)
      .then(results => {
        results.forEach(result => {
          let data = result.data["Technical Analysis: MACD"]; // Accesses correct object within API
          let timeStamps = Object.keys(data);
          x = false;
          y = false;
          
          // Subtract current Signal from current MACD Determine if it is a positive or negative value
          if (data[timeStamps[0]].MACD - data[timeStamps[0]].MACD_Signal > 0) {
            x = true;
          }
         
          // Subtract yesterday's Signal from yesterday's MACD  Determine if it is a positive or negative value
          if (data[timeStamps[1]].MACD - data[timeStamps[1]].MACD_Signal > 0) {     // CHANGE THE 1'S TO 20'S FOR TESTING TO GIVE IT A LARGER RANGE
            //if (data[timeStamps[20]].MACD - data[timeStamps[20]].MACD_Signal > 0) { 
            y = true;
          }
          
          // If the 2 values aren't equal then the lines crossed, If they are both true or both false the lines did not cross
          if (!x === y) {                          
            x = false;                              
            y = false;
            console.log("the lines have crossed");
            // Construct user text message
             // Need to get the current company here and put it in SMS Message
            let message = `The MACD Signal lines have crossed.`;
            // let message = `The MACD Signal lines for ${company} have crossed.`    // Construct user text message - Need company here.
            console.log("message:", message);
            console.log("phoneNumber:", userNumber);
            console.log("******************************************");
            // Run the Nexmo api
            nexmo.message.sendSms(
              YOUR_VIRTUAL_NUMBER,
              myPhone,                       //*********** CHANGE TO USER PHONE NUMBER FOR DEPLOYMENT *********
              message,
              (err, responseData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.dir(responseData);
                }
              }
            );
          } else {
            console.log("the lines have not crossed");
          }
        });
      })
      .catch(error => {
        console.error("There was an error with the network requests", error);
      });
    //})
  };
  getCustomers();
  console.log("Scan complete");
  // running = false;
};
// END OF SCANNER FUNCTION


//Server response get '/'
server.get("/", async (req, res) => {
  await res
    .status(200)
    .json({ response: "PICKEM Investor-Data App Successfully Launched" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
