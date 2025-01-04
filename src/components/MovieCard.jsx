/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const MovieCard = ({ movie }) => {
  return (
    <Card style={{ width: "15rem", margin: "10px", borderRadius:"2rem"}}>
      <Card.Img variant="top" style={{ maxHeight: '250px', overflow: 'auto' }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <Card.Body className="bg-black" style={{ maxHeight: '150px',  color:"white"}}>
        <Card.Title className="text-center mx-auto ellipsis text-nowrap" style={{ overflow: 'hidden' }}>{movie.original_title}</Card.Title>
        <Card.Text className="text-muted text-center">{movie.release_date}</Card.Text>
        <Button variant="outline-light d-flex justify-content-center mx-5 my-3" href={`/movies/${movie.id}`}>
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;