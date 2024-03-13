function Search({ searchMovies }) {
  return (
    <div className="w-full p-4">
      <input
        type="text"
        className="w-full p-4"
        placeholder="Search"
        onInput={searchMovies}
      />
    </div>
  );
}

export default Search;
