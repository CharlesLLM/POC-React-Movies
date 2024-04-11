import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie, genres }) {
  const [type, setType] = useState('');

  useEffect(() => {
    setType(movie.first_air_date ? 'tv' : 'movie');
  }, [movie.first_air_date]);

  const movieDate = new Date(movie.first_air_date ?? movie.release_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <Link to={`/${type}/${movie.id}`} className="w-full m-4 hover:opacity-80">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title ?? movie.name} />
      </Link>
      <ul className="flex flex-wrap gap-1 mt-0.5">
        {movie.genre_ids?.map((genre, index) => (
          <li key={index} className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm leading-none">
            {genres.find(g => g.id === genre)?.name}
          </li>
        ))}
      </ul>
      <Link to={`/${type}/${movie.id}`}>
        <h2 className="underline">{movie.title ?? movie.name}</h2>
      </Link>
      <p>{movieDate}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieItem;
