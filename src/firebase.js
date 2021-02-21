import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBNIAUzetxtfaGjY8ntEd5fPl-wM6uewHg",
  authDomain: "todo-beab0.firebaseapp.com",
  databaseURL: "https://todo-beab0-default-rtdb.firebaseio.com",
  projectId: "todo-beab0",
  storageBucket: "todo-beab0.appspot.com",
  messagingSenderId: "660510106159",
  appId: "1:660510106159:web:80c3bd29b8b7c2a5465cda",
  measurementId: "G-YW3K6LEY17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
