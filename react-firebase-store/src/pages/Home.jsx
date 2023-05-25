import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../database/firebase'
import { userLogin, userLogout } from '../slice/userSlice';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from './Login';

export default function Home() {

    // 로그인해서 리덕스에 저장한 값은 새로고침전까지 유지
    const user = useSelector((state)=>(state.user))
    const user1 = useSelector((state)=>(state.user.user))
    const dispatch = useDispatch();

    // 새로고침할때, auth에 로그인이 되었는지 확인하고 로그인이 되어있다면 값을 가져옴
    // useEffect(()=>{
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //             const uid = user.uid;
    //             dispatch(userLogin({
    //                 name : user.displayName,
    //                 email : user.email,
    //                 uid : user.uid,
    //                 photo : user.photoURL
    //             }))
    //           // ...
    //         } else {
    //           // User is signed out
    //           // ...
    //         }
    //         });
    // },[])


    // 새로고침했을 때 세션값은 살아있다
    // 단, 페이지가 완전히 꺼지면 값을 사라진다
    // 각 데이터마다 살아있는 기간을 확인하여 사용
    useEffect(()=>{
        const userData = sessionStorage.getItem('user');
        // 문자열에서 객체로 바꿔서 사용
        if(userData) //userData값이 있을 때(한번 로그인한 상태) dispatch 실행
            dispatch(userLogin(JSON.parse(userData)))
    },[])


    // 로그아웃
    const logout =()=>{

        // 로그아웃 누르기전까지 계속 로그인 상태 유지
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(userLogout());
            }).catch((error) => {
                sessionStorage.clear();
                // An error happened.
        });

    }

    return (
        <div>
            <h3>Home</h3>
            <Link to='/login'>로그인창으로 이동</Link>
            <br />
            <button onClick={logout}>로그아웃</button>

            <p>{ user.user && user.user.name }</p>
            <img src={user1 && user1.photo} alt="" />
            {/* user1값이 null일때는 표시되지않도록 user1 && */}
        </div>
    )
}
