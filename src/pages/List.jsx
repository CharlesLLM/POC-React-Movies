import { useEffect, useState } from "react";
import options from "../TMDB-wrapper";
import { db } from "../db";
import SearchForm from "../components/SearchForm/SearchForm";
import MovieItem from "../components/MovieItem/MovieItem";

function List() {
  const [url, setUrl] = useState('https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&include_adult=false');
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
    const getMovies = () => {
      fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: options.apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
        })
        .catch(error => console.error(error));
    }

    getMovies();
  }, [url]);

  const handleInput = (searchText) => {
    if (searchText !== "") {
      setUrl(`https://api.themoviedb.org/3/search/multi?language=fr&page=1&include_adult=false&query=${searchText}`);
    } else {
      setUrl('https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&include_adult=false');
    }
  }

  const handleGenreSelect = (genreId) => {
    setUrl(`https://api.themoviedb.org/3/discover/movie?language=fr&page=1&include_adult=false&with_genres=${genreId}`);
  }

  return (
    <div className="flex flex-wrap">
      <h1 className="w-full text-center">Movies list</h1>
      <SearchForm genres={genres} handleInput={handleInput} handleGenreSelect={handleGenreSelect} />
      {movies.map((movie) => (
        <div key={movie.id} className="w-1/3 p-4">
          <MovieItem movie={movie} genres={genres} />
        </div>
      ))}
    </div>
  );
}

export default List;
