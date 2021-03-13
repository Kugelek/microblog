import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import SinglePostPage from './pages/SinglePostPage';
import EditPostPage from './pages/EditPostPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
  
      <Router>
      <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
           <Route path="/add-post">
            <AddPostPage />
          </Route>
          <Route path="/article/:id">
            <SinglePostPage />
          </Route>
          <Route path="/edit/:id">
            <EditPostPage />
          </Route>
          <Route path="/stats">
            <StatsPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
