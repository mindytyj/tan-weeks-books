import { useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function ReviewButton({ bookId }) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  async function handleReview() {
    try {
      const reviewCount = await sendRequest(
        `/api/reviews/${bookId}/${user.id}`,
        "GET"
      );

      if (reviewCount.rowCount === 0) {
        return navigate(`/books/${bookId}/review`);
      }

      navigate(`/books/${bookId}/review/edit`);
    } catch (error) {
      console.error(error.message);
    }
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
