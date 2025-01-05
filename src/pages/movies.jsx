/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Pagination } from "react-bootstrap";

const Movies = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key={UR_API}&page=${page}`
      );
      setMovies(response.data.results);
      setFilteredMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch movies.");
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="custom-spinner"></div>
        <p className="mt-3 fs-1 fw-bold">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-3">Popular Movies</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="d-flex justify-content-center my-4">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </div>
  );
};

export default Movies;
