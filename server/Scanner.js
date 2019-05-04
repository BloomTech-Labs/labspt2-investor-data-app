//import React from 'react'
//import axios from 'axios'
exports.scanner = function(knex, Promise) {
const axios = require('axios')
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '92c4425a',
  apiSecret: '4P8i5tJ5EXygp6p4'
})
const YOUR_VIRTUAL_NUMBER = '18572560178'
const from = '18572560178'
let to = '';
const text = 'Hello from Nexmo'
let symbol = "";

console.log("made it, ")
/* let message = `The MACD Signal lines for have crossed.`
nexmo.message.sendSms(
 YOUR_VIRTUAL_NUMBER, '16199641367', message,
   (err, responseData) => {
     if (err) {
       console.log(err);
     } else {
       console.dir(responseData);
     }
   }
); */


const Scanner = () => {
console.log("made it here")
    let companies = [];  





    // map through the user list 
return knex.select('id', 'uid', 'phone').from('users')
for (let i = 0; i < users.length; i++) {
   companies = [];
   to = users[i].phoneNumber 
   console.log("phone", to)
   // get the favorites for each user put in an array
    return knex.select('id', 'uid', 'symbol').from('favorites')
    for (let j = 0; j < favorites.length; j++) {
        if (users[i].uid === favorites[j].uid) {
            companies.push(favorites[j].symbol)
        }
    }
    
    let promises = companies.map(company =>   // map that sends array of companies through axios to invoke external API
          
        // axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&interval=5min&apikey=TFUONSVQ3ZDFXFPG`));
             axios.get(` https://www.alphavantage.co/query?function=MACD&symbol=${company}&interval=daily&series_type=open&apikey=TFUONSVQ3ZDFXFPG`));
             symbol = company;  
        let stocks = [];
        let timeStamp;
        axios
            .all(promises)
            .then(results => {
                results.forEach(result => {  // loops through keys to access targeted values of stock(s)
              
                    if (result.data.Note) {
                      throw new Error()
                    }
      
                    let data = result.data['Technical Analysis: MACD'] //Accesses correct object within API
                    let timeStamps = Object.keys(data)
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
                   if  ((macd - signal) > 0) {
                   
                        x = true //positive value
                        console.log("x:", x)
                   } 
                   if  ((macdPrior - signalPrior) > 0) {
                    y = true   //positive value
                    console.log("y:", y)
               } 
               //compare the two values so see if there is a difference.
               if (x === x) {
              // if (!x === y) {
                 
              x = false;
                   y = false;
                   alert("the lines crossed");
               let message = `The MACD Signal lines for ${symbol} have crossed.`
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
                               
                alert("the lines have not crossed")
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
    } 
 
  }

   // module.exports = scanner;