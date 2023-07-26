export default function GenreSelector({ handleChange }) {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="genre">
        Genre
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="genre"
          name="genreId"
          onChange={handleChange}
        >
          <option value={1}>Horror</option>
          <option value={2}>Poetry</option>
          <option value={3}>Thrillers</option>
          <option value={4}>Romance</option>
          <option value={5}>History</option>
          <option value={6}>Self-Help</option>
          <option value={7}>Biography</option>
          <option value={8}>Kids</option>
        </select>
      </div>
    </div>
  );
}
