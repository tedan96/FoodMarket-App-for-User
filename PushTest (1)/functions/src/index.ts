import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const topic = "songpafood.all";

export const sendSongpafoodAllMessage =
  functions.https.onCall((data, context) => {
    if (context.auth?.uid != "h54p1BWdcFMgQNrNmnZ4G4MMxGi1") { // admin uid
      // https://firebase.google.com/docs/reference/functions/providers_https_#functionserrorcode
      throw new functions.https.HttpsError("permission-denied",
          "The function must be called while authenticated.");
    }

    const title = data.title;
    const content = data.content;
    const board = data.board;
    const id = data.id;

    const message = {
      notification: {
        title: title,
        body: content,
      },
      data: {
        message: JSON.stringify({
          board: board,
          id: id,
        }),
      },
      topic: topic,
      // token: webToken,
      name: title,
    };

    console.log(message);

    admin.messaging().send(message)
        .then((response) => {
          // Response is a message ID string.
          return "Successfully sent message:" + response;
        })
        .catch((error) => {
          throw new functions.https.HttpsError("unknown", error);
        });
  });
