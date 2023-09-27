import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create A Post</Link>
        <Link to="/">Home Page</Link>
        <Routes>
          <Route path='/' exact Component={HomePage}/>
          <Route path='/createpost' exact Component={CreatePost}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
