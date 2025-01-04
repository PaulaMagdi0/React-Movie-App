import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap"; 

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key={UR_API}`
      );
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch movie details.");
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

    return (
      <div style={{backgroundColor: "black", padding:"3rem"}}>
        <div className="container">
          <div className="movie-section">
            <img src={image} alt={movie.original_title} />
            <div className="movie-content">
              <h1>{movie.original_title}</h1>
              <div className="rating">
                <i className="fa fa-star"></i>
                &nbsp; {movie.vote_average.toFixed(1)} (IMDb) &nbsp; | &nbsp; {movie.release_date}
              </div>
              <p>{movie.overview || "No description available."}</p>
              <div className="details">
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Original Language:</strong> {movie.original_language}
                </p>
              </div>
              <Link
                to="#"
                className="watch-trailer"
                onClick={() => movie.homepage && window.open(movie.homepage)}
              >
                <i className="fa fa-play-circle"></i> Visit Official Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
    
};

export default MovieDetails;
