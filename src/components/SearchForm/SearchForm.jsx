function SearchForm({ genres, handleInput, handleGenreSelect }) {
  return (
    <div className="flex w-full p-4">
      <input
        type="text"
        className="w-2/3 p-4"
        placeholder="Search"
        onInput={(event) => handleInput(event.target.value)}
      />
      <select className="w-1/3 p-4" onChange={(event) => handleGenreSelect(event.target.value)}>
        <option value="">All genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchForm;
