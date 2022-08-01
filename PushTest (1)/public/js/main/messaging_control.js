const messaging = firebase.messaging();
const functions = firebase.functions();

const elem = document.querySelector("#debug-messaging");

const logKeys = function(obj){
    var keys = [];
    for(var key in obj){
       keys.push(key);
    }
    console.log(keys);
 }

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    window.alert(payload.notification.title, payload.notification.body);
    logKeys(payload);
});

// get registration token
// messaging.getToken({vapidKey: "BNbaEyhFesFnQkXnUnDs0ZCQlYE05l7UgSK491MGHbR8WmS_VXCwLWnzU-J_xgPyt2xNyGbhTQRGhZAkKojr7VY"})
//     .then((result) => {
//         console.log(result);
//     });

// http://localhost:5000/main#?menu=Notices&id=WMHUtJFoUNljwB6vKHvX
const sendMessage = () => {
    const title = document.querySelector("#message-title").value;
    const content = document.querySelector("#message-content").value;

    const link = document.querySelector("#message-select-link").value;
    let menu, id;

    if (link.length > 0) {
        // TODO: verify link
        const queryString = link.split("?")[1];
        const params = new URLSearchParams(queryString);
        menu = params.get("menu");
        id = params.get("id");
    }
    
    var sendMessage = firebase.functions().httpsCallable("sendSongpafoodAllMessage");
    sendMessage({
                title: title,
                content: content,
                board: menu,
                id: id
            }
        )
        .then((result) => {
            console.log("success to send message!");
            logKeys(result);
        })
        .catch((error) => {
            console.log("Faild to send message");
            var code = error.code;
            var message = error.message;
            var details = error.details;
            logKeys(code);
            logKeys(message);
            logKeys(details);
        });
}