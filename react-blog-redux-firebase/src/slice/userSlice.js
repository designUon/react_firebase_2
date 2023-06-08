import { createSlice } from '@reduxjs/toolkit'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../database/firebase';

export const userSlice = createSlice({
    name : "user",
    initialState : {
        // user 속성 안에  {} 객체를 저장해서 사용할 수도 있다
        // user : {
        //     email : "",
        //     uid : null,
        // }
        user : null,
        email : "",
        uid : null,
    },
    // state의 값을 바꾸는 함수
    reducers : {
        // 로그인했을 때, 값 넣는 리듀서
        loginUser : (state, action)=>{
            
            // state 자체에 바로 값을 넣을 수 없다
            // state = action.payload;
            // 값을 바로 넣고싶으면 return action.payload 사용
            
            state.email = action.payload.email;
            state.uid = action.payload.uid;

            //로그인했을 때 세션에 값 저장
            //
            sessionStorage.setItem('user',JSON.stringify(action.payload))
            // JSON.stringify => 문자열로 바로 바꿀 수 있음

        },
        // 로그아웃했을 때 state의 값을 바꾸는 리덕스
        logoutUser : (state)=>{
            state.uid = null;
            state.email = ""

            // 세션에 저장된 정보 삭제
            sessionStorage.removeItem('user');
        }
    }
})

// 비동기 함수를 사용하기위한 thunk 함수
// dispatch는 액션함수를 사용하기 위한 함수
// 비동기함수 액션에서 값을 가져올 때 첫번째 값에 매개변수를 사용
export const checkUser = (user) => async(dispatch) => {

    // Main.jsx => const checkUser 에서 가져온 값

    // const docRef = await getDoc(doc(db, "users", uid))
    const docRef = await getDoc(doc(db, "users", user.uid))
    // if(!docRef) {
    // exists() 함수는 getDoc을 통해 가져온 값이 
    // 있으면 true, 없으면 false
    if(!docRef.exists()) {
        // addUser(user);
        // 위에 있는 addUser안의 값 가져와서 넣기
        // user 추가 함수 - firestore 작성
        // user{uid, email}
        await setDoc(doc(db, "users", user.uid), user);
    }else{
        console.log("가입되어있습니다")
    }
    dispatch(loginUser(user))
}

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;