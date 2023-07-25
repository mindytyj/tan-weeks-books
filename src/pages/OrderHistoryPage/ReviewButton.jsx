import { useNavigate } from "react-router-dom";

export default function ReviewButton({ bookId }) {
  const navigate = useNavigate();

  function handleReview() {
    navigate(`/books/${bookId}/review`);
  }

  return (
    <button
      className="uk-button uk-button-primary uk-button-small uk-text-center"
      type="button"
      onClick={handleReview}
    >
      Review
    </button>
  );
}
