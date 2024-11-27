// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBEGb5dLY28mdqz1URsRs6CLU-IO0bZTM",
  authDomain: "contactos-personales.firebaseapp.com",
  projectId: "contactos-personales",
  storageBucket: "contactos-personales.firebasestorage.app",
  messagingSenderId: "81886867483",
  appId: "1:81886867483:web:04100d3c34a2e11e96c8be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)