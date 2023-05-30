// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Cloud Firestore 초기화 - 01
// https://firebase.google.com/docs/firestore/quickstart?hl=ko&authuser=0#initialize
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "reading-books-4a970.firebaseapp.com",
    projectId: "reading-books-4a970",
    storageBucket: "reading-books-4a970.appspot.com",
    messagingSenderId: "1022692665983",
    appId: "1:1022692665983:web:2f438a5b89a123c3cb2d4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Cloud Firestore 초기화 - 02
// const db = getFirestore(app); + export 추가 => 내보내기
export const db = getFirestore(app);