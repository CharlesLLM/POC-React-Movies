import { useEffect, useState } from "react";
import "./App.css";

function App() {
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
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="">
      <h1 className="text-red-500">Test</h1>
    </div>
  );
}

export default App;
