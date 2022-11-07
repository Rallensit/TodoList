import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCHR3ezskT1JwQD58mKZHxz0BKok9V8NVk",
  authDomain: "todolist-ce0b1.firebaseapp.com",
  projectId: "todolist-ce0b1",
  storageBucket: "todolist-ce0b1.appspot.com",
  messagingSenderId: "874477453480",
  appId: "1:874477453480:web:c525ae1b198ae060ba029d",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
