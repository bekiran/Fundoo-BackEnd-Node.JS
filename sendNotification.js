var admin = require("firebase-admin");
var serviceAccount = require("../FundooNotes-server/fundoonote-58387-firebase-adminsdk-zhi98-e08501d1d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fundoonote-58387.firebaseio.com"
  });


  var options = {
    priority: "normal",
    timeToLive: 60 * 60
};

module.exports = {

    sendNotification(token,payload) {

        console.log('send notification ' ,payload);
        
        var registerationToken = token
        admin.messaging().sendToDevice(registerationToken, payload, options)
            .then(function (response) {
                console.log("Message sent successfully", response);

            })
            .catch(function (error) {
                console.log("Error in sending message", error);
            })

    }
}



// module.exports = {
//   SendPushNotify(token) {
//     var registrationToken = token;

//     var payload = {
//       notification: {
//         title: "Fundoo notification check",
//         body: "Working"
//       }
//     };

//     var options = {
//       priority: "high",
//       timeToLive: 60 * 60 * 24
//     };
//     admin
//       .messaging()
//       .sendToDevice(registrationToken, payload, options)
//       .then(function(response) {
//         console.log("Successfully sent message: ", response);
//       })
//       .catch(function(error) {
//         console.log("Error sending message: ", error);
//       });
//   }
// };




