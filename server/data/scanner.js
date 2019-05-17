const axios = require("axios");
const nexmo = require("./nexmoConfig");


scanner = () => {
  const YOUR_VIRTUAL_NUMBER = "18572560178";
  let userNumber = "";
 // const URL = "http://localhost:5000/api/sms"; // ********** CHANGE FOR DEPLOYMENT *************
  const URL = "https://pickemm.herokuapp.com/api/sms";

  getCustomers = () => {
    const customers = [];
    axios
      .get(`${URL}/billing`) // Get User Data
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {  // ***************** USE FOR DEPLOYMENT ************
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

        customers.forEach(result => {    
          // Step through the user data
          response.data.forEach(results => {     
            // Check if user is a match to billing usersId     
            if (results.uid === result) {
              // Check if receiveTexts is enabled        
               if (results.receiveTexts === true) {   // ***************** USE FOR DEPLOYMENT ************
             // if (results.receiveTexts === 1) {
                // Format the users number        
                userNumber =
                  "1" +
                  results.phoneNumber.slice(1, 1) +
                  results.phoneNumber.slice(4, 7) +
                  results.phoneNumber.slice(9, 12) +
                  results.phoneNumber.slice(-4); // Save the users phone number               
                console.log("userNumber:", userNumber)
      
              
                getFavorites(results.uid, userNumber); // Send each user to the next subroutine
              }
            }
          })
        })
      })
      .catch(err => {
        console.log("There was an error accessing the users table", err);
      });
  };

  getFavorites = (uid, phoneNumber) => {
    // Get all the favorites for each user 
    let companies = [];
    axios
      .get(`${URL}/favorites`) // User favorites
      .then(response => {
        response.data.forEach(result => {
          // Step through the favorites data
          if (result.uid === uid) {
            // Check for a match to the user uid
            companies.push(result.symbol); // Add each symbol to companies array
          }
          console.log("Checking Number:", phoneNumber)
          console.log("Checking Uid:", uid)
          //console.log("Checking i:", i)
        })
        getStocks(companies, phoneNumber); // Send the companies to next subroutine
      })
      .catch(err => {
        console.log("There was an error");
      });
  };

  getStocks = (companies, phoneNumber) => {

    let promises = companies.map((company) =>
      axios.get(`https://www.alphavantage.co/query?function=MACD&symbol=${company}&interval=daily&series_type=open&apikey=TFUONSVQ3ZDFXFPG`));

    let timeStamp;
    let x = false;
    let y = false;

    axios
      .all(promises)
      .then(results => {

        results.forEach(result => {
          // Pulling the company symbol out of the url

          // function sms() {
          let symbol = result.config.url.slice(55, 62)
          let newSymbol = symbol.substr(0, symbol.indexOf("&"))
          let data = result.data["Technical Analysis: MACD"]; // Accesses correct object within API
          let timeStamps = Object.keys(data);
          x = false;
          y = false;

          // Subtract current Signal from current MACD Determine if it is a positive or negative value
          if (data[timeStamps[0]].MACD - data[timeStamps[0]].MACD_Signal > 0) {
            x = true;
          }

          // Subtract yesterday's Signal from yesterday's MACD  Determine if it is a positive or negative value
          // CHANGE THE 1'S TO 20'S FOR TESTING TO GIVE IT A LARGER RANGE or uncomment the next line
          if (data[timeStamps[1]].MACD - data[timeStamps[1]].MACD_Signal > 0) {
            //if (data[timeStamps[20]].MACD - data[timeStamps[20]].MACD_Signal > 0) { 
            y = true;
          }

          // If the 2 values aren't equal then the lines crossed, If they are both true or both false the lines did not cross
          if (!x === y) {
            let test = Date.now() + 2000
              let z = 0
              console.log("Date:", test)
              do {
                z = z + 1;

              }

            while (Date.now() < test) 
            x = false;
            y = false;
            console.log("the lines have crossed");
            // Construct user text message
            let message = `The MACD Signal lines for ${newSymbol} have crossed.`
            console.log("message:", message);
            console.log("phoneNumber:", phoneNumber);
            console.log("*******************************");
            // Run the Nexmo api
            //   function sms() {

            nexmo.message.sendSms(
              YOUR_VIRTUAL_NUMBER,
              phoneNumber,
              message,
              (err, responseData) => {
                if (err) {
                  console.log(err);
                } else {
                  console.dir(responseData);
                  // Need to check the response text and see if we need to resend the text
                  // If yes, the app needs to wait and then resend the text
                }
              }
            );//}



          } else {
            console.log("the lines have not crossed");
          }

          //  }

          //  setTimeout(sms, 1000); 
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