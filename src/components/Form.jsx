import { useState, useEffect } from 'react';
import { db } from '../db';

function Form({ handleChangeSearch, handleChangeGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await db.genres.orderBy('name').toArray();
      setGenres(result);
    };

    fetchGenres();
  }, []);

  return (
    <div className="w-full p-4">
      <input
        type="text"
        className="w-1/4 p-4"
        placeholder="Search"
        onInput={(e) => handleChangeSearch(e.target.value)}
      />
      <select 
        className="w-1/4 p-4"
        onChange={(e) => handleChangeGenre(e.target.value)}
      >
        <option value="">Genre</option>
        {genres?.map((genre, index) => (
          <option key={index} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Form;
