import './App.css';
import './style.scss'
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {currentUser}=useContext(AuthContext)
  console.log(currentUser);
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' 
          element={<ProtectedRoute>
            <Home/>
          </ProtectedRoute>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/register' element={<Signup/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;