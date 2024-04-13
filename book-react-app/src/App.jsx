import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/books/BookList';
import NewBook from './components/books/NewBook';
import ViewBook from './components/books/ViewBook';
import EditBook from './components/books/EditBook';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(true); // For simplicity, setting loggedIn to true initially
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/books" component={BookList} />
          <Route exact path="/books/new" component={NewBook} />
          <Route exact path="/books/:id" component={ViewBook} />
          <Route exact path="/books/:id/edit" component={EditBook} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
