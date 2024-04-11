import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Movie from "./pages/Movie";
import FavoritesList from "./pages/FavoritesList";
import options from "./TMDB-wrapper";
import { db } from "./db";

function App() {
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: options.apiKey
      }
    })
      .then((res) => res.json())
      .then(async (data) => {
        if ((await db.genres.count()) !== data.genres.length) {
          await db.genres.clear();
          db.genres.bulkAdd(data.genres);
        }
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/:type/:movieId" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
