import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>
        </div>
        <Routes>
          <Route path='/' exact Component={HomePage}/>
          <Route path='/createpost' exact Component={CreatePost}/>
          <Route path='/post/:id' exact Component={PostDetails}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
