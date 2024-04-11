import { useEffect, useState } from "react";
import { db } from "../../db";

function Comment({ movie }) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchComment = async () => {
      const result = await db.comments.where('movieId').equals(String(movie.id)).first();
      if (result) {
        setComment(result.comment);
      }
    };

    fetchComment();
  }, [movie.id]);

  const submitComment = async () => {
    const movieId = String(movie.id);
    const existingComment = await db.comments.where('movieId').equals(movieId).first();
    if (comment === "") {
      if (existingComment) {
        await db.comments.delete(existingComment.id);
      }
    } else {
      if (existingComment) {
        await db.comments.update(existingComment, { movieId, comment: comment });
      } else {
        await db.comments.add({ movieId, comment: comment });
      }
    }
  }

  return (
    <div className="p-4 border border-gray-500 rounded-lg mb-4">
      <p>Commentaire</p>
      <form 
        defaultValue={comment && comment}
        onSubmit={(e) => {
          e.preventDefault();
          submitComment();
      }}>
        <textarea
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
          value={comment && comment}
          onChange={(e) => setComment(e.target.value)}
        >
          {comment && comment}
        </textarea>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Envoyer</button>
      </form>
    </div>
  );
}

export default Comment;
