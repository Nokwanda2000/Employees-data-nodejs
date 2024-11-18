// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALkME2zNzLrE38OTNpB2iqzoaZnj7kB_4",
  authDomain: "employees-app-nodejs.firebaseapp.com",
  projectId: "employees-app-nodejs",
  storageBucket: "employees-app-nodejs.firebasestorage.app",
  messagingSenderId: "644655552157",
  appId: "1:644655552157:web:ddc7174103a544755f2674",
  measurementId: "G-CQENCCTRMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics ,db, collection, addDoc};