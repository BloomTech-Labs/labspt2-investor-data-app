//Firebase Service Account - for authentication on backend
const dotenv = require("dotenv");
const admin = require("firebase-admin");

const serviceAccount = require("./pickem-597ad-firebase-adminsdk-ssuf8-d551e72305");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**** FIREBASE MIDDLEWARE AUTH ***/

module.exports = admin;
