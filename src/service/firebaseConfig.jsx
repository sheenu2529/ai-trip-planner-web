// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM2oK07dFG1yTwg5a1ZnAWa5DM8A-6pJs",
  authDomain: "trip-planner-ad6a0.firebaseapp.com",
  projectId: "trip-planner-ad6a0",
  storageBucket: "trip-planner-ad6a0.appspot.com",
  messagingSenderId: "739799278611",
  appId: "1:739799278611:web:48fb27f9676ef847c68be6",
  measurementId: "G-RQMDFFH2PG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);