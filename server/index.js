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
const cron = require('node-cron')
//const admin = require("./data/auth/firebaseMiddleware");

server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger("tiny"));
server.use(helmet());
server.use("/api/billing", verifyToken, billingRouter);
server.use("/api/favorites", verifyToken, favoritesRouter);
server.use("/api/users", verifyToken, usersRouter);
server.use("/api/stripe", stripeRouter);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//import cron from "node-cron";
//const scanner = require("./Scanner.js");
//server.use("/", verifyToken);

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
cron.schedule("* * * * *", () => {
  //cron.schedule("0 18 * * *", () => {
  console.log(`sending message`);
  Scanner();
});

server.post('/send', (req, res) => {
  // Send SMS
  nexmo.message.sendSms(
    config.number, req.body.toNumber, req.body.message, { type: 'unicode' },
    (err, responseData) => { if (responseData) { console.log(responseData) } }
  );
});


Scanner = () => {
 // console.log("made it here")
  const companies = ['MSFT', 'AAPL'];
  // let companies = [];  
  const axios = require('axios')
  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
    apiKey: '92c4425a',
    apiSecret: '4P8i5tJ5EXygp6p4'
  })
  const YOUR_VIRTUAL_NUMBER = '18572560178'
  const from = '18572560178'
  let to = '';
  let k = 0;

  // map through the user list 
  //  let query = db('users');     //('id', 'uid', 'phone').from('users')

  //    console.log("query:", query)
  // return server.select('id', 'uid', 'phone').from('users')
  //query.forEach() 
  // for (let i = 0; i < query.length; i++) {
  //   companies = [];
  //   to = query[i].phoneNumber 
  //   console.log("phone", to)
  // get the favorites for each user put in an array
  //    return knex.select('id', 'uid', 'symbol').from('favorites')
  //   for (let j = 0; j < favorites.length; j++) {
  //      if (users[i].uid === favorites[j].uid) {
  //           companies.push(favorites[j].symbol)
  //      }
  //   }

  let promises = companies.map(company =>   // map that sends array of companies through axios to invoke external API
    axios.get(` https://www.alphavantage.co/query?function=MACD&symbol=${company}&interval=daily&series_type=open&apikey=TFUONSVQ3ZDFXFPG`));
   
  let stocks = [];
  let timeStamp;
  axios
    .all(promises)
    .then(results => {
      results.forEach(result => {  // loops through keys to access targeted values of stock(s)

        if (result.data.Note) {
          throw new Error()
        }
 
        symbol = companies[k];
        k = k + 1;
        let data = result.data['Technical Analysis: MACD'] //Accesses correct object within API
        let timeStamps = Object.keys(data)
    /*     let x = false;
        let y = false;
      if ((data[timeStamps[0]].MACD -  data[timeStamps[0]].MACD_Signal) > 0) {
        x = true;
      }

      if (( data[timeStamps[1]].MACD -  data[timeStamps[1]].MACD_Signal) > 0) {
        y = true;
      } */
       
      
      let current = data[timeStamps[0]]
        let prior = data[timeStamps[1]]
        let macd = current.MACD
        let signal = current.MACD_Signal
        let macdPrior = prior.MACD
        let signalPrior = prior.MACD_Signal

        console.log("macd:", macd)
        console.log("signal:", signal)
        let x = false;
        let y = false;
        if ((macd - signal) > 0) {

          x = true //positive value
          console.log("x:", x)
        }
        if ((macdPrior - signalPrior) > 0) {
          y = true   //positive value
          console.log("y:", y)
        }
        //compare the two values so see if there is a difference.
       // if (x === x) {
         if (!x === y) {

          x = false;
          y = false;
          console.log("the lines have crossed")
 
          // alert("the lines crossed");
         // let message = `The MACD Signal lines for have crossed.`
          let message = `The MACD Signal lines for ${symbol} have crossed.`
          console.log("message:", message)
          nexmo.message.sendSms(
            YOUR_VIRTUAL_NUMBER, '16199641367', message,
            (err, responseData) => {
              if (err) {
                console.log(err);
              } else {
                console.dir(responseData);
              }
            }
          );
        } else {
          console.log("the lines have not crossed")
         // alert("the lines have not crossed")
        }
      })
        .catch(error => {
          console.error('There was an error with the network requests', error)
        });
      // get the favorites for each user put in an array

      //fetch the MACD data for each stock

      //check the current days and do a comparison to previous days

      //send a sms message for any stocks that are crossing

      //using the uid get the phone number from the users file

    })
}
// }



//Server response get '/'
server.get("/", async (req, res) => {
  await res
    .status(200)
    .json({ response: "PICKEM Investor-Data App Successfully Launched" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
