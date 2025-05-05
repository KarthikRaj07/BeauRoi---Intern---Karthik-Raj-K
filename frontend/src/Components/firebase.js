// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrTjZsfcZBBeqLo1WgU77jrc7_jYHwHMo",
    authDomain: "skillpath-auth.firebaseapp.com",
    projectId: "skillpath-auth",
    storageBucket: "skillpath-auth.firebasestorage.app",
    messagingSenderId: "877183025005",
    appId: "1:877183025005:web:2b72dd5a32e3e9659da464",
    measurementId: "G-560ZJG40DX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);