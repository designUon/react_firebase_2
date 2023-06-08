// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Board from './page/Board';
import { useDispatch } from 'react-redux';
import { loginUser } from './slice/userSlice';
import { useEffect } from 'react';
import BoardWriteForm from './page/BoardWriteForm';
import BoardPage from './page/BoardPage';

function App() {

  const dispatch = useDispatch();

  // 화면 새로고침 할때마다 확인
  // app컴포넌트는 한 번 마운트되고
  // 새로고침 또는 꺼질 때까지 마운트되지않는다
  useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem('user'));
      if(user){
          dispatch(loginUser(user))
      }
  }, [])

  return (
    <div className="App">
      <Routes>
        {/* 
          여러페이지에서 firestore에 가져올 때, 동일 값(uid)
          만약 값이 바뀐다면 updateDoc, getDoc을 통해 값을 계속 가져오
        */}
        <Route path='/' element={<Main/>}/>
        {/* 
          Board와 BoardPage에서만 사용(동일데이터를 중복해서쓰지않기)
          => state에 넣어서 사용
          board의 값은 계속 추가 / 삭제 / 수정됨으로
          firestore에서 바로 가져와서 사용(가장 최신 데이터 유지)
        */}
        <Route path='/board' element={<Board/>}/>
        <Route path='/board-write-form' element={<BoardWriteForm/>}/>
        {/* param값으로 주소 이동할때 */}
        <Route path='/board/:id' element={<BoardPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
