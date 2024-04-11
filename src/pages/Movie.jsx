import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import options from "../TMDB-wrapper";
import Comment from "../components/Comment/Comment";
import Favorite from "../components/Favorite/Favorite";
import Note from "../components/Note/Note";

function Movie() {
  const { type, movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${movieId}?language=fr&append_to_response=credits`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: options.apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.error(error));
  }, [type, movieId]);

  const movieDate = new Date(movie.first_air_date ?? movie.release_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <h1 className="text-xl text-center">{movie.title ?? movie.name}</h1>
      <div className="flex">
        <div className="w-2/5">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-11/12" alt={movie.title ?? movie.name} />
          <ul className="flex flex-wrap gap-1 mt-1">
            {movie.genres?.map((genre, index) => (
              <li key={index} className="bg-gray-700 text-white rounded-md mt-2 px-2 py-1 text-sm leading-none">
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/5 pt-16 flex flex-col gap-4">
          <p className="text-md">{movie.overview}</p>
          <p>Sortie: {movieDate}</p>
          <h2>Acteurs principaux :</h2>
          <div className="flex gap-4">
            {movie.credits?.cast?.slice(0, 5).map((actor, index) => (
              <div key={index} className="flex flex-col gap-2">
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} className="w-40" alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
          <Favorite movie={movie} />
          <p>Avis: {movie.vote_average}/10 parmi {movie.vote_count} votes</p>
          <Note movie={movie} type={type} />
          <Comment movie={movie} />
        </div>
      </div>
      <Link to="/">
        <button className="bg-gray-700 text-white rounded-md mt-4 px-4 py-3 leading-none">Retour à la liste</button>
      </Link>
    </>
  )
}

export default Movie;
