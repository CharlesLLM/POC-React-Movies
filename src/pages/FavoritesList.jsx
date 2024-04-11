import { useEffect, useState } from "react";
import { db } from "../db";
import options from "../TMDB-wrapper";
import MovieItem from "../components/MovieItem/MovieItem";

function FavoritesList() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await db.genres.orderBy('name').toArray();
      setGenres(result);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response1 = await fetch(`https://api.themoviedb.org/3/account/${options.accountId}/favorite/movies?language=en-US&sort_by=created_at.asc`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: options.apiKey
          }
        });
        const data1 = await response1.json();
  
        const response2 = await fetch(`https://api.themoviedb.org/3/account/${options.accountId}/favorite/tv?language=en-US&sort_by=created_at.asc`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: options.apiKey
          }
        });
        const data2 = await response2.json();
  
        setMovies([...data1.results, ...data2.results]);
      } catch (error) {
        console.error(error);
      }
    }

    getMovies();
  }, [movies]);

  return (
    <div className="flex flex-wrap">
      <h1 className="w-full text-center">Favorites list</h1>
      {movies.map((movie, index) => (
        <div key={index} className="w-1/3 p-4">
          <MovieItem movie={movie} genres={genres} />
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;
