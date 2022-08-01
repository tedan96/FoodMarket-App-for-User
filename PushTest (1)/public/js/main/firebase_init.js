firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // user login success
    } else {
        window.location.href = "/";
    }
});

const logout = () => {
    firebase.auth().signOut().then(function () {
        alert("Logout success");
        location.reload();
    }).catch(function (error) {
        console.log(error.code);
    });
}
