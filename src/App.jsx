import { useEffect } from "react";
import List from "./components/List";
import options from "./TMDB-wrapper";
import { db } from "./db";

function App() {
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', options)
      .then((res) => res.json())
      .then(async (data) => {
        if ((await db.genres.count()) !== data.genres.length) {
          await db.genres.clear();
          db.genres.bulkAdd(data.genres);
        }
      });
  }, []);

  return (
    <>
      <h1 className="text-center">Movies</h1>
      <List />
    </>
  );
}

export default App;
