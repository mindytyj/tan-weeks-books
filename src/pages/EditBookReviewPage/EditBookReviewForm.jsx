import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import sendRequest from "../../utilities/send-request";

export default function EditBookReviewForm({ review, setReview }) {
  const user = useAtomValue(userAtom);
  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleAddReview(event) {
    event.preventDefault();

    try {
      const formData = { ...review };
      await sendRequest(`/api/reviews/${id}/${user.id}`, "PUT", {
        formData,
      });
      navigate(`/books/${id}`);
    } catch {
      setError("Failed to edit review. Please try again.");
    }
  }

  function handleChange(event) {
    setReview({ ...review, [event.target.name]: event.target.value });
  }

  const disable = review.review === "" || review.recommendation === "";

  return (
    <form autoComplete="off" onSubmit={handleAddReview}>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend uk-text-center">{review.title}</legend>

        <div className="uk-margin">
          <div className="uk-form-label">Review</div>
          <div className="uk-form-controls">
            <textarea
              className="uk-textarea"
              rows="5"
              aria-label="review"
              name="review"
              value={review.review}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="uk-margin uk-form-width-small">
          <div className="uk-form-label">Recommendation</div>
          <div className="uk-form-controls">
            <select
              className="uk-select"
              id="recommendation"
              name="recommendation"
              value={review.recommendation}
              onChange={handleChange}
            >
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </select>
          </div>
        </div>
      </fieldset>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
        disabled={disable}
      >
        Edit Review
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
