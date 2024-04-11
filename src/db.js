import Dexie from 'dexie';

export const db = new Dexie('tmdb-poc');
db.version(1).stores({
  genres: '++id, name',
  comments: '++id, movieId, comment'
});
