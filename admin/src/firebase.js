// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCR6SaH3eO9T2bUbaEELcNNe1Tc97PbE",
  authDomain: "e-commerce-tutorial-e673a.firebaseapp.com",
  projectId: "e-commerce-tutorial-e673a",
  storageBucket: "e-commerce-tutorial-e673a.appspot.com",
  messagingSenderId: "150153065920",
  appId: "1:150153065920:web:5ec07727ade920e2988425",
  measurementId: "G-J0FP5PNB52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;