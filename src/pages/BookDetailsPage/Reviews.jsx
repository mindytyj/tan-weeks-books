import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { bookAtom } from "./bookContext";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const book = useAtomValue(bookAtom);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      try {
        const allReviews = await sendRequest(`/api/reviews/${book.id}`, "GET");
        setReviews(allReviews);
      } catch (error) {
        console.error(error.message);
      }
    }
    getReviews();
  }, []);

  return (
    <div className="uk-section uk-section-muted uk-preserve-color">
      <div className="uk-container uk-margin-left uk-margin-right">
        <h2 className="uk-text-center">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return <ReviewCard review={review} key={review.id} />;
          })
        ) : (
          <h3 className="uk-text-center">No Reviews Yet.</h3>
        )}
      </div>
    </div>
  );
}
