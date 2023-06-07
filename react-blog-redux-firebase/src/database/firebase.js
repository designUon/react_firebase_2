// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSWFd6BcclWPEpny-k0XzMGuzuY-SKI3A",
    authDomain: "test230526.firebaseapp.com",
    projectId: "test230526",
    storageBucket: "test230526.appspot.com",
    messagingSenderId: "537798690201",
    appId: "1:537798690201:web:7be0121653d9ba6f9eff08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 인증에 관한 내용 추가
export const auth = getAuth(app);

// 데이터베이스
export const db = getFirestore(app);