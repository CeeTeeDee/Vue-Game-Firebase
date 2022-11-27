import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/firestore';
// import firebase from 'firebase';
// import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCxrDg7HVUoUtfXUl_umz1d9O3eJUvwoPY",
  authDomain: "vue-game-test.firebaseapp.com",
  projectId: "vue-game-test",
  storageBucket: "vue-game-test.appspot.com",
  messagingSenderId: "196255302240",
  appId: "1:196255302240:web:204813bab4631e8794f905"
};


const app = initializeApp(firebaseConfig);
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const usersCollection = collection(db, 'users_info');
// export const dbfire = firebaseApp.firestore();
// export default firebase.initializeApp(firebaseConfig);