// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDAIu6_aqICmn0bcL014Zj1pbKSD0zuBZk",
    authDomain: "pushtest-61ad2.firebaseapp.com",
    databaseURL: "https://pushtest-61ad2.firebaseio.com",
    projectId: "pushtest-61ad2",
    storageBucket: "pushtest-61ad2.appspot.com",
    messagingSenderId: "106856281877",
    appId: "1:106856281877:web:41706c084103e4a7659b1c",
    measurementId: "G-RPFM08LTGT"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();