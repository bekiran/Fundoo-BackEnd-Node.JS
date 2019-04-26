const admin = require("firebase-admin");

const serviceAccount = require("../FundooNotes-server/fundoonote-58387-firebase-adminsdk-zhi98-e08501d1d6.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fundoonote-58387.firebaseio.com"
  });
module.exports = {
  SendPushNotify(token) {
    var registrationToken = token;

    var payload = {
      notification: {
        title: "Fundoo notification check",
        body: "Working"
      }
    };

    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
    admin
      .messaging()
      .sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message: ", response);
      })
      .catch(function(error) {
        console.log("Error sending message: ", error);
      });
  }
};