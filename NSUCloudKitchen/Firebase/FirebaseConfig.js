import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBstqun9iAHdWjnwKnsZf0c4yjvXj7HApc",
  authDomain: "foodapp1-55d5a.firebaseapp.com",
  projectId: "foodapp1-55d5a",
  storageBucket: "foodapp1-55d5a.appspot.com",
  messagingSenderId: "398769872242",
  appId: "1:398769872242:web:f71e9758427ca3af8d91eb",
  measurementId: "G-GL2MPRQBQZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
