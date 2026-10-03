import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import './App.css';

const App = () => {
  const count = useSelector((s: RootState) => s.favorites.length);
  return (
    <div className="app">
      <header>
        <div>
          <Link className="brand" to="/">VK Marusya</Link>
          <p>Movie discovery portfolio project</p>
        </div>
        <Link to="/" className="fav-link">
          ❤️ Favorites ({count})
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="*" element={<div className="error">404 - Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
