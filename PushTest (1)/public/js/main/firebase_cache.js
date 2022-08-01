// not using now 2021-01-26

let isCache = false;

// https://medium.com/firebase-developers/firestore-clients-to-cache-or-not-to-cache-or-both-8f66a239c329
// https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=ko#web
firebase.firestore().enablePersistence()
    .then(function () {
        isCache = true;
    })
    .catch(function (err) {
        window.alert(err.code);
        console.log(err.code);
        isCache = false;
        // if (err.code == 'failed-precondition') {
        //     // Multiple tabs open, persistence can only be enabled
        //     // in one tab at a a time.
        //     // ...
        // } else if (err.code == 'unimplemented') {
        //     // The current browser does not support all of the
        //     // features required to enable persistence
        //     // ...
        // }
    });
// Subsequent queries will use persistence, if it was enabled successfully


let snapshot = await documentRef.get({
    source: 'cache'
});
if (!snapshot.exists) {
    snapshot = await documentRef.get({
        source: 'server'
    })
}