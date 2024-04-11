import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import options from "../../TMDB-wrapper";

function Note({ movie, type }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/account/${options.accountId}/rated/movies?sort_by=created_at.asc`, {
      method: 'GET',
      headers: {
        accept: 'application',
        Authorization: options.apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        const movieNote = data.results.find(result => result.id === movie.id);
        setNote(movieNote ? movieNote.rating : null);
      })
      .catch(err => console.error(err));
  }, [movie.id]);

  const handleNote = (newValue) => {
    setNote(newValue);
    const ratingOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: options.apiKey
      },
      body: JSON.stringify({value: newValue}),
    };

    fetch(`https://api.themoviedb.org/3/${type}/${movie.id}/rating`, ratingOptions)
      .then(response => response.json())
      .catch(err => console.error(err));
  };

  const deleteNote = () => {
    setNote(null);
    const ratingOptions = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: options.apiKey
      }
    };

    fetch(`https://api.themoviedb.org/3/${type}/${movie.id}/rating`, ratingOptions)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  return (
    <div className="flex gap-5">
      <Rating
        value={note}
        max={10}
        onChange={(event, newValue) => {
          handleNote(newValue);
        }}
      />
      <button onClick={deleteNote}>Supprimer la note</button>
    </div>
  );
}

export default Note;
