import { useEffect, useState } from "react";
import options from "../TMDB-wrapper";
import SearchText from "./SearchText";

function List() {
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&include_adult=false', options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getMovies();
  }, []);

  const searchMovies = (searchText) => {
    if (searchText === "") {
      getMovies();
    } else {
      fetch(`https://api.themoviedb.org/3/search/multi?language=fr&page=1&include_adult=false&query=${searchText}`, options)
        .then(response => response.json())
        .then(response => {
          setMovies(response.results);
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div className="flex flex-wrap">
      <SearchText searchMovies={searchMovies} />
      {movies.map((movie, index) => (
        <div key={index} className="w-1/4 p-4">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default List;
