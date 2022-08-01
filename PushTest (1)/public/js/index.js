firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    loginSuccess();
  } else {

  }
});

// https://firebase.google.com/docs/auth/web/auth-state-persistence#modifying_the_auth_state_persistence
// auto logout

const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
          // // log user for debugging
          // let myArray = Object.values(user);
          // console.log(myArray);
          loginSuccess();

        }).catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;

          if (errorCode === "auth/user-not-found" ||
            errorCode === "auth/wrong-password") {
            alert("ID 또는 비밀번호를 확인해주세요.");
          } else {
            alert("Unknown error");
            console.log(errorCode);
          }
        });
    });
}

const loginSuccess = () => {
  document.location.href = "/main.html";
}

document.getElementById("btn_login").addEventListener("click", login);