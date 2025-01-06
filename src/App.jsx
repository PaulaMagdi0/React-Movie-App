import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav';
import Movies from './pages/movies';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/notFound';
import Wishlist from './pages/wishlist';
import { useState } from 'react';
import RegisterForm from './pages/registration';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Movies searchQuery={searchQuery} />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/registration" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;