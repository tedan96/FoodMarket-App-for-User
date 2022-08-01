import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// export const helloWorld = functions.https.onCall((data, context) => {
//   return {
//     name: "cho young woo",
//     operator: "+",
//   };
// });


// const webToken = `c-Q3A_2bvI2lRfu7x7XC1p:
// APA91bHxEMMcdOlcBsNMTJnM9l2lZjBvBrslhOjCA
// wBwObvbOP43HRLVQRyyMvWOKKDLkoRUsc2KDo20KQ
// s1BZ6og4FPlDuFP4Je3OyVUTujmjpujc8Reu08WsO
// XZ6uD9d8C-RFvOIpC`.replace(/\n/gi, "");

// admin.messaging().subscribeToTopic(webToken, topic)
//     .then((response) => {
//       // See the MessagingTopicManagementResponse reference documentation
//       // for the contents of response.
//       console.log("Successfully subscribed to topic:", response);
//     })
//     .catch((error) => {
//       console.log("Error subscribing to topic:", error);
//     });

export const sendSongfoodAllMessage = functions.https.onCall((data, context) => {
  if (context.auth.uid != "h54p1BWdcFMgQNrNmnZ4G4MMxGi1") // admin's uid
    return "Not admin";


  const topic = 'songpafood/all';
  const title = data.title;
  const content = data.content;
  const board = data.board;
  const id = data.id;


  const message = {
    topic: topic,
    name: title,
    notification: {
      title: title,
      body: content,
    },
    data: {
      board: board,
      id: id,
    },
  };


  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      return 'Successfully sent message:' + response;
    })
    .catch((error) => {
      return 'Error sending message:' + error;
    });
});
