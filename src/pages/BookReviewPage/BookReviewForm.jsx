export default function BookReviewForm({ book }) {
  return (
    <form>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend uk-text-center">{book.title}</legend>

        <div className="uk-margin">
          <div className="uk-form-label">Review</div>
          <div className="uk-form-controls">
            <textarea
              className="uk-textarea"
              rows="5"
              placeholder="Share your thoughts on the book to help fellow readers make their decision."
              aria-label="review"
            />
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-form-label">Recommendation</div>
          <div class="uk-form-controls">
            <label>
              <input class="uk-radio" type="radio" name="yes" /> Yes
            </label>
            <br />
            <label>
              <input class="uk-radio" type="radio" name="no" /> No
            </label>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
