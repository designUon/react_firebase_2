import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../database/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';

import { checkUser, loginUser, logoutUser } from '../slice/userSlice';
import { Link } from 'react-router-dom';

export default function Main() {
    
    // 화면에 보이기 위해 state 사용
    // 화면에 출력하고 공통으로 데이터를 사용하기 위해 리덕스 사용
    const user = useSelector((state)=>state.user);

    const dispatch = useDispatch();

    // const dispatch = useDispatch();
    // // 새로고침할때마다 확인
    // useEffect(()=>{
    //     const user = JSON.parse(sessionStorage.getItem('user'));
    //     if(user){
    //         dispatch(loginUser(user))
    //     }
    // })
    // => App.js로 이동함




    // 유저 추가 함수 - firestore 작성
    // user {uid, email}
    // const addUser = async(user) => {
    //     await setDoc(doc(db, "users", user.uid), user);
    // }


    // // 유저 확인 함수 - firestore 작성
    // // const checkUser = async(uid) => {
    // const checkUser = async(user) => {
    //     // const docRef = await getDoc(doc(db, "users", uid))
    //     const docRef = await getDoc(doc(db, "users", user.uid))
    //     // if(!docRef) {
    //     // exists() 함수는 getDoc을 통해 가져온 값이 
    //     // 있으면 true, 없으면 false
    //     if(!docRef.exists()) {
    //         // addUser(user);
    //         // 위에 있는 addUser안의 값 가져와서 넣기
    //         // user 추가 함수 - firestore 작성
    //         // user{uid, email}
    //         await setDoc(doc(db, "users", user.uid), user);
    //     }else{
    //         console.log("가입되어있습니다")
    //     }
    // }


    // 구글 로그인 함수
    const onGoogleLogin = () => {

        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)

            // .then((result) => {
            .then((result) => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.dir(user);
                
                //로그인되었다면 uid 확인후 firestore에 저장
                // await setDoc(doc(db, "cities", "LA"), {
                //     name: "Los Angeles",
                //     state: "CA",
                //     country: "USA"
                // });

                // -------------- await 오류 => 
                // await setDoc(doc(db, "users", user.uid), {

                // });

                //로그인되었다면 uid 확인후 firestore에 저장
                // addUser({
                //     uid : user.uid,
                //     email : user.email
                // });
                // checkUser({
                //     uid : user.uid,
                //     email : user.email
                // });
                // dispatch(loginUser({
                //     uid : user.uid,
                //     email : user.email
                // }))
                
                // 로그인했다면, uid를 확인후 firestore에 저장
                dispatch(checkUser({uid : user.uid, email : user.email}))

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }



    // 구글 로그아웃 버튼
    // https://firebase.google.com/docs/auth/web/password-auth?hl=ko&authuser=0
    const onGoogleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("로그아웃 완료")
        }).catch((error) => {
                // An error happened.
        });
    }


    return (
        <div>
            <h3>Main</h3>
            {
                user.uid ? <div>
                    <h2>{user && user.email}님 환영합니다</h2>
                    <button onClick={onGoogleLogout}>로그아웃</button>
                </div>
                : <button onClick={onGoogleLogin}>구글로 로그인</button>
            }
            {/* <button onClick={onGoogleLogin}><img src="/img/google_logo.png" alt="" /></button> */}
            {/* <button onClick={onGoogleLogin}>구글로 로그인</button>
            <h2>{user && user.email}님 환영합니다</h2>
            <button onClick={onGoogleLogout}>로그아웃</button> */}
            <Link to='/board'>게시물 보러가기</Link>
        </div>
    )
}
