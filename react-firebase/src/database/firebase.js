// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 인증을 위한 getAuth를 가져옴
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH,
    projectId: "ex-firebase-59044",
    storageBucket: "ex-firebase-59044.appspot.com",
    messagingSenderId: "328138352325",
    appId: "1:328138352325:web:0064512b0b953492dd32ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// console.log(app)

// 사용하고자하는 서비스를 들고와서 사용
// 인증서비스에 관한 내용 들고와서 사용
export const auth = getAuth(app);
