const Nexmo = require("nexmo");

const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET      
const NEXMO_API_KEY = process.env.NEXMO_API_KEY            


const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
});


module.exports = nexmo;
