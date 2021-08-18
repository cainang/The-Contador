import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyBmi48mMIaH5UxKlUl62fhWyj8GrALx3_c",
  authDomain: "the-contador.firebaseapp.com",
  projectId: "the-contador",
  storageBucket: "the-contador.appspot.com",
  messagingSenderId: "163265675736",
  appId: "1:163265675736:web:1f269b7ef40e1d8090f2ad",
  measurementId: "G-8HGQQ8HHGP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
