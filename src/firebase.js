import firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTODOMAINE,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
  databaseURL: "https://card-maker-cfa9b-default-rtdb.firebaseio.com",
}; // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
