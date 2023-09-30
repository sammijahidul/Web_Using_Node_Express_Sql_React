import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import {AuthContext} from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authSate, setAuthState] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/user/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });       
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{authSate, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create A Post</Link>
            {!authSate && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registrations">Registration</Link>
              </>
            )}
          </div>
          <Routes>
            <Route path='/' exact Component={HomePage}/>
            <Route path='/createpost' exact Component={CreatePost}/>
            <Route path='/post/:id' exact Component={PostDetails}/>
            <Route path='/login' exact Component={LoginPage}/>
            <Route path='/registrations' exact Component={RegistrationPage}/>
          </Routes>
        </Router>
      </AuthContext.Provider>      
    </div>
  );
}

export default App;
