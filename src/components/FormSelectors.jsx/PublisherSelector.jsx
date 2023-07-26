export default function PublisherSelector({ handleChange, publisher }) {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="publisher_id">
        Publisher
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="publisher_id"
          name="publisher_id"
          value={publisher}
          onChange={handleChange}
        >
          <option value={1}>Penguin Publishing Group</option>
          <option value={2}>Random House Publishing Group</option>
          <option value={3}>Scholastic, Inc.</option>
          <option value={4}>Scribner</option>
          <option value={5}>HarperCollins Publishers</option>
        </select>
      </div>
    </div>
  );
}
