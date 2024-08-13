// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore" ;
import { getStorage } from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDUcqm9oiKm2Hix-h1WwnLGbrpG07LJfCQ",
  authDomain: "mbraille-54f34.firebaseapp.com",
  projectId: "mbraille-54f34",
  storageBucket: "mbraille-54f34.appspot.com",
  messagingSenderId: "19458179979",
  appId: "1:19458179979:web:2d0aa29f836fe344b2258e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication=getAuth(app);
const database = getFirestore();
const storage = getStorage(app);

export { authentication, database, storage } ;
