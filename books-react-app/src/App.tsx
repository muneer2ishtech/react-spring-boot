import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SideNav from './components/nav/SideNav';
import BooksList from './components/books/BooksList';
import NewBook from './components/books/NewBook';
import ViewBook from './components/books/ViewBook';
import EditBook from './components/books/EditBook';

const App: React.FC = () => (
  <Router>
    <SideNav />
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />

      <Route path="/books" element={<BooksList />} />
      <Route path="/books/new" element={<NewBook />} />
      <Route path="/books/:id" element={<ViewBook />} />
      <Route path="/books/:id/edit" element={<EditBook />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;
