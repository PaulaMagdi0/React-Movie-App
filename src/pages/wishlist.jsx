import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../redux/wishlist'; // or '../redux/wishlistSlice'
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is empty!</p>
      ) : (
        <ul className="list-group">
          {wishlistItems.map(item => (
            <h3 key={item.id} className="list-group-item d-flex justify-content-between align-items-center text-black">
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} style={{width:"100px",height:"100px"}}/>
              <Link to={`/movies/${item.id}`} className="text-decoration-none">
                Name : {item.title}
              </Link>
              <button className="btn btn-danger" onClick={() => dispatch(removeFromWishlist(item.id))}>
                Remove
              </button>
            </h3>
          ))}
        </ul>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => dispatch(clearWishlist())}>
        Clear Wishlist
      </button>
    </div>
  );
};

export default Wishlist;