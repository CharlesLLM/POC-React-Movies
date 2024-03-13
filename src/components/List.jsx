import { useEffect, useState } from "react";
import options from "../TMDB-wrapper";

function List() {
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getMovies();
  }, []);

  const searchMovies = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      getMovies();
    } else {
      fetch(`https://api.themoviedb.org/3/search/multi?query=${event.target.value}&language=en-US&page=1&include_adult=false`, options)
        .then(response => response.json())
        .then(response => {
          setMovies(response.results)
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <input
            type="text"
            className="w-full p-4"
            placeholder="Search for a movie"
            onInput={searchMovies}
          />
        </div>
        {movies.map((movie, index) => (
          <div key={index} className="w-1/4 p-4">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
