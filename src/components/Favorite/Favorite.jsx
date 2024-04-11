import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import options from "../../TMDB-wrapper";
import './Favorite.css';

function Favorite({ movie }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/account/${options.accountId}/favorite/${movie.first_air_date ? 'tv' : 'movies'}?language=fr`, {
      method: 'GET',
      headers: {
        accept: 'application',
        Authorization: options.apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        const isFavorite = data.results.some(favoriteMovie => favoriteMovie.id === movie.id);
        setFavorite(isFavorite);
      })
      .catch(err => console.error(err));
  }, [movie.id, movie.first_air_date]);

  const toggleFavorite = () => {
    const favoriteOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: options.apiKey
      },
      body: JSON.stringify({
        media_type: movie.first_air_date ? 'tv' : 'movie',
        media_id: movie.id,
        favorite: !favorite
      }),
    };

    fetch(`https://api.themoviedb.org/3/account/${options.accountId}/favorite`, favoriteOptions)
      .then(response => response.json())
      .then(() => setFavorite(!favorite))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <button className="favorite-button" onClick={toggleFavorite}>
        {favorite ? <FaHeart className="heart-icon filled" /> : <FaRegHeart className="heart-icon" />}
        <span>Ajouter aux favoris</span>
      </button>
    </div>
  );
}

export default Favorite;
