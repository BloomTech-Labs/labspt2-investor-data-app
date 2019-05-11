const axios = require("axios");
const nexmo = require("./nexmoConfig");
const myPhone = "16199641367"; //*********    For testing, ENTER YOUR PHONE NUMBER HERE !!! *********


scanner = () => {

    const YOUR_VIRTUAL_NUMBER = "18572560178";
    const from = "18572560178";
    let userNumber = "";
    const URL = "http://localhost:5000/api/sms"; // ********** CHANGE FOR DEPLOYMENT *************
    // const URL = "https://pickemm.herokuapp.com/api";
  
    getCustomers = () => {
      const customers = [];
      axios
        .get(`${URL}/billing`) // Get User Data
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {  // ***************** USE FOR DEPLOYMENT ************
            // for (let i = 0; i < 2; i++) {
            // Step through the user data
            customers.push(response.data[i].usersId);
          }
          // Send users to the next subroutine
          getUsers(customers);
        })
        .catch(err => {
          console.log("There was an error accessing billing table", err);
        });
    };
  
    getUsers = customers => {
      axios
        .get(`${URL}/users`) // Get User Data
        .then(response => {
          // for (let i = 0; i < response.data.length; i++) {  // ***************** USE FOR DEPLOYMENT ************
          for (let i = 0; i < customers.length; i++) {
            // Step through the user data
            for (let j = 0; j < response.data.length; j++) {
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
          console.log("There was an error accessing the users table", err);
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
           // let symbol = result.config.url
           // Pulling the company symbol out of the url
            let symbol = result.config.url.slice(55, 62)
            let newSymbol = symbol.substr(0, symbol.indexOf("&"))
            console.log("symbol:", newSymbol);
            let data = result.data["Technical Analysis: MACD"]; // Accesses correct object within API
            let timeStamps = Object.keys(data);
            x = false;
            y = false;
  
            // Subtract current Signal from current MACD Determine if it is a positive or negative value
            if (data[timeStamps[0]].MACD - data[timeStamps[0]].MACD_Signal > 0) {
              x = true;
            }
  
            // Subtract yesterday's Signal from yesterday's MACD  Determine if it is a positive or negative value
            if (data[timeStamps[4]].MACD - data[timeStamps[4]].MACD_Signal > 0) {     // CHANGE THE 1'S TO 20'S FOR TESTING TO GIVE IT A LARGER RANGE
              //if (data[timeStamps[20]].MACD - data[timeStamps[20]].MACD_Signal > 0) { 
              y = true;
            }
  
            // If the 2 values aren't equal then the lines crossed, If they are both true or both false the lines did not cross
            if (!x === y) {
              x = false;
              y = false;
              console.log("the lines have crossed");
              // Construct user text message
              let message = `The MACD Signal lines for ${newSymbol} have crossed.`   
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
   
  };

  module.exports = scanner;