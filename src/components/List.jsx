import { useEffect, useState } from "react";

function List() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjI5NWEyNWQ2NTVlNGIyMjc1N2U0MDdjZThhMjUyZiIsInN1YiI6IjY1ZjE3NzkwMmZkZWM2MDE4OTIxOTE0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0AzmkRMpkjUYf-ux_vX9o2meflI08vTnv43p_n-sR9g'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results)
      })
      .catch(error => console.error(error));
  }, []);

  if (movies.length === 0) {
    return <h2 className="text-center">Loading...</h2>
  }

  return (
    <div>
      <div className="flex flex-wrap">
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
