export default function AuthorSelector({ handleChange, author }) {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="author_id">
        Author
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="author_id"
          name="author_id"
          value={author}
          onChange={handleChange}
        >
          <option value={1}>Yuval Noah Harari</option>
          <option value={2}>Mark Manson</option>
          <option value={3}>Stephen King</option>
          <option value={4}>J.K. Rowling</option>
          <option value={5}>Geronimo Stilton</option>
          <option value={6}>Luke Russert</option>
        </select>
      </div>
    </div>
  );
}
