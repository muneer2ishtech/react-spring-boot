import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SideNav from './components/nav/SideNav';
import BooksList from './components/books/BooksList';
import NewBook from './components/books/NewBook';
import ViewBook from './components/books/ViewBook';
import EditBook from './components/books/EditBook';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

const App: React.FC = () => (
  <Router>
    <div className="App">
      <SideNav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />

          <Route path="/books" element={<BooksList />} />
          <Route path="/books/new" element={<NewBook />} />
          <Route path="/books/:id" element={<ViewBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
