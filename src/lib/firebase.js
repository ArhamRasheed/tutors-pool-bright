// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9ExD-zp2ziTM6e18fj5ChSZMywzVph5s",
  authDomain: "tutorspool-52a65.firebaseapp.com",
  projectId: "tutorspool-52a65",
  storageBucket: "tutorspool-52a65.firebasestorage.app",
  messagingSenderId: "847079525866",
  appId: "1:847079525866:web:0d43a4c829223d5b29b693",
  measurementId: "G-0ZXWW194Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };