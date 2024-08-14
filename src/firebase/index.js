// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVOTYFU6aq0XdG9VWsNa9Wik-4jbRMMF4",
  authDomain: "chatapp-9a4ee.firebaseapp.com",
  projectId: "chatapp-9a4ee",
  storageBucket: "chatapp-9a4ee.appspot.com",
  messagingSenderId: "439782798383",
  appId: "1:439782798383:web:be32a15615d45ac773c2da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth referansını al
export const auth = getAuth(app);

//google sağlayıcısını kur.
export const provider = new GoogleAuthProvider();

// firebase firestore veritabanını referansını al
export const db = getFirestore(app);