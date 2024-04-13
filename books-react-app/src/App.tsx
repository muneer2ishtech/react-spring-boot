import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BooksList from './components/books/BooksList';
import NewBook from './components/books/NewBook';
import ViewBook from './components/books/ViewBook';
import EditBook from './components/books/EditBook';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={BooksList} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />

          <Route exact path="/books/new" component={NewBook} />
          <Route exact path="/books/:id" component={ViewBook} />
          <Route exact path="/books/:id/edit" component={EditBook} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
