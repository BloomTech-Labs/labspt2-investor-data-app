const Nexmo = require("nexmo");
//const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET       // Could not get this to work
//const NEXMO_API_KEY = process.env.NEXMO_API_KEY             // Could not get these to work

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
});

module.exports = Nexmo;
