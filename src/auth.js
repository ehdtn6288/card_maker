import "firebase/auth";
import firebase from "firebase/app";

const signInAuth = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      //   console.log(userCredential);
      var user = userCredential.user;
      console.log(user.uid, "ddd", user.email);
      return user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //   console.log(errorCode, "++++", errorMessage);
      // ..
    });
};

export default signInAuth;
