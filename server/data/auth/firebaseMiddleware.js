const { createFirebaseAuth } = require("express-firebase-auth");

//Firebase Service Account - for authentication on backend

var admin = require("firebase-admin");

var serviceAccount = require("./pickem-597ad-firebase-adminsdk-ssuf8-d551e72305");

/**** FIREBASE MIDDLEWARE AUTH ***/

module.exports = {
  firebaseAuth: createFirebaseAuth({
    serviceAccount,
    ignoredUrls: ["/ignore"]
  }),

  // Middle ware for is it authenticated
  isAuthenticated: (req, res, next) => {
    if (res.locals.user) {
      return next();
    }
    res.redirect("/");
  }
};
