import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import FireStoreTest from './pages/FireStoreTest';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/firestore' element={<FireStoreTest/>}/>
      </Routes>
    </div>
  );
}

export default App;
