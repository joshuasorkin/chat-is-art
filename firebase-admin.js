const admin = require("firebase-admin");
const dotenv = require("dotenv");

console.log(`service account: ${process.env.FIREBASE_SERVICEACCOUNTKEYPATH}`);
var serviceAccount = require("./"+process.env.FIREBASE_SERVICEACCOUNTKEYPATH);
module.exports = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });