import React, { useState } from 'react'

// firebase를 초기화하면서 들고온 auth
import { auth } from '../database/firebase';
// firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginForm() {

    // input 태그에 있는 값을 가져오는 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //react가 실행되는 동안에 저장될 user 데이터
    // accessToken은 세션이나 브라우저에 저장해서 로그인확인하는 용도로 사용하게 됨
    // {email. uid, displayName} => 자주 가져오는 값들
    // 로그인 되지않았을때 값 => null
    const [user, setUser] = useState(null);

    // email login 메소드
    const onEmailLogin = (e) => {
        // submit 새로고침 막아주기
        e.preventDefault();
        // 구글에서 제공하는 이메일 메소드 사용
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in => 회원가입에 성공했을 때 나오는 내용
                const user = userCredential.user;
                // ...
                console.log(user)
                setUser(
                    {
                        uid: user.uid,
                        email : user.email,
                        displayName : user.displayName,
                    }
                )
            })
            .catch((error) => {
                // 회원가입에 실패했을 때 나오는 내용
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
                // if(errorCode == "auth/email-already-in-use") {
                //     //alert을 이용하여 알려주거나, 태그를 이용해서 안내
                //     alert('이미 가입된 이메일주소입니다')
                // } else if(errorCode == "auth/weak-password" || errorCode == "auth/wrong-password") {
                //     alert('비밀번호를 잘못입렸했습니다, 6자리 이상 적어주세요')
                // }
                if(errorCode == "auth/user-not-found " || errorCode == "auth/wrong-password") {
                    alert('존재하지않는 이메일이거나 비밀번호가 잘못입력되었습니다')
                }
            });
    }



    // email login 메소드
    const onClickLogin = () => {
        // async와 await를 이용해서 파이어베이스메소드 사용
        // (비동기함수로 만들기 => async)
        async function getLogin(){
            // 오류가 날 가능성이 있는 모든 코드를 try에 작성
            try{
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                console.log(user);
                setUser(
                    {
                        uid: user.uid,
                        email : user.email,
                        displayName : user.displayName,
                    }
                )
            }
            // 오류가 났을 때 실행 할 코드
            // 오류가 나면 화면이 멈추는 것이 아니라 catch를 실행하고 다른 아래쪽의 코드를 실행
            catch(error){
                console.log(error.code, error.message);
            }
        }
        getLogin();
    }




    return (
        <div>
            <h3>LoginForm</h3>
            <form onSubmit={onEmailLogin}>
                <label htmlFor="">E-mail</label>
                <input type="e-mail" required
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                />
                <br />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <input type="submit" value="회원가입" />
                <button type='button' onClick={onClickLogin}>로그인</button>
            </form>

            {/* null값은 출력이 안되고 에러가 뜨게 됨 */}
            {/* <h3>{user.email}</h3> */}
            {/* null값일 때 에러 안뜨도록 삼항연산자로 작성 */}
            <br />

            {/* <button type='button' onClick={onClickLogin}>로그인</button> */}

            <h3>{user ? user.email : "로그인되지않았습니다"}</h3>
        </div>
    )
}
