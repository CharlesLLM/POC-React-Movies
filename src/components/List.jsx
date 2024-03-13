import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import options from "../TMDB-wrapper";
import Form from "./Form";

function List() {
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState('https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&include_adult=false');
  const [genre, setGenre] = useState('');
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = useDebounce(searchText, 500);

  const handleChangeSearch = (text) => {
    setSearchText(text);
  };

  const handleChangeGenre = (genre) => {
    setGenre(genre);
  }

  const getMovies = () => {
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (searchText === "") {
      setUrl('https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&include_adult=false');      
    } else {
      setUrl(`https://api.themoviedb.org/3/search/multi?language=fr&page=1&include_adult=false&query=${searchText}`);
    }

    getMovies();
    if (genre !== "") {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.genre_ids.includes(genre)));
    }

  }, [debounceSearchText, genre]);

  return (
    <div className="flex flex-wrap">
      <Form handleChangeSearch={handleChangeSearch} handleChangeGenre={handleChangeGenre} />
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
