function SearchText({ searchMovies }) {
  return (
    <div className="w-full p-4">
      <input
        type="text"
        className="w-full p-4"
        placeholder="Search"
        onInput={(event) => searchMovies(event.target.value)}
      />
    </div>
  );
}

export default SearchText;
