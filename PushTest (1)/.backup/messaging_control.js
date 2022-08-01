const messaging = firebase.messaging();
const functions = firebase.functions();


// const helloworld = functions.httpsCallable('helloWorld');
// helloworld()
//     .then((result) => {
//         console.log('-------------------hello-------------------');
//         console.log(result);
//     });


const elem = document.querySelector("#debug-messaging");

// Add the public key generated from the console here.
// messaging.getToken({
//         vapidKey: "BNbaEyhFesFnQkXnUnDs0ZCQlYE05l7UgSK491MGHbR8WmS_VXCwLWnzU-J_xgPyt2xNyGbhTQRGhZAkKojr7VY"
//     })
//     .then((currentToken) => {
//         if (currentToken) {
//             console.log('nice! : ' + currentToken);

//             // sendTokenToServer(currentToken);
//             // updateUIForPushEnabled(currentToken);
//         } else {
//             // Show permission request.
//             console.log('No registration token available. Request permission to generate one.');
//             // Show permission UI.
//             // updateUIForPushPermissionRequired();
//             // setTokenSentToServer(false);
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // showToken('Error retrieving registration token. ', err);
//         // setTokenSentToServer(false);
//     });


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    window.alert(payload);
    // ...
});


const sendMessage = () => {



}

/*
{
  "message": {
    "name": "api 에서 보냄",
    "notification": {
      "title": "api 보내는 제목",
      "body": "그리고 내용들 입니다."
    },
    "topic": "주제 입니다 exp",
    "data": {
      "board": "Notices",
      "id": "K0bjWfSxZACTcKEsxNWA"
    }
  },
  "validateOnly": false
}
*/