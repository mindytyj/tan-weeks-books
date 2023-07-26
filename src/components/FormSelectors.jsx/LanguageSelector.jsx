export default function LanguageSelector({ handleChange, language }) {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="language_id">
        Language
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="language_id"
          name="language_id"
          value={language}
          onChange={handleChange}
        >
          <option value={1}>English</option>
          <option value={2}>Chinese</option>
          <option value={3}>Malay</option>
          <option value={4}>Hindi</option>
          <option value={5}>Japanese</option>
          <option value={6}>French</option>
        </select>
      </div>
    </div>
  );
}
