import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";

export default function BookReviewForm({ book }) {
  const user = useAtomValue(userAtom);
  const [review, setReview] = useState({
    review: "",
    recommendation: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleAddReview(event) {
    event.preventDefault();

    try {
      const formData = { ...review };
      await sendRequest(`/api/books/${book.id}/reviews/${user.id}`, "POST", {
        formData,
      });
      navigate(`/books/${book.id}`);
    } catch {
      console.error("Failed to add review.");
      setError("Failed to add review. Please try again.");
    }
  }

  function handleChange(event) {
    setReview({ ...review, [event.target.name]: event.target.value });
  }

  const disable = review.review === "" || review.recommendation === "";

  return (
    <form autoComplete="off" onSubmit={handleAddReview}>
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
              name="review"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="uk-margin">
          <div className="uk-form-label">Recommendation</div>
          <div className="uk-form-controls" onChange={handleChange}>
            <label>
              <input
                className="uk-radio uk-margin-small-right	"
                type="radio"
                name="recommendation"
                value="yes"
              />
              Yes
            </label>
            <br />
            <label>
              <input
                className="uk-radio uk-margin-small-right"
                type="radio"
                name="recommendation"
                value="no"
              />
              No
            </label>
          </div>
        </div>
      </fieldset>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
        disabled={disable}
      >
        Add Review
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
