import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import EditBookReviewForm from "./EditBookReviewForm";

export default function EditBookReviewPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = useAtomValue(userAtom);
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function getUserReview() {
      setLoading(true);
      const userReview = await sendRequest(
        `/api/reviews/${id}/${user.id}`,
        "GET"
      );
      setReview(userReview.rows[0]);
      setLoading(false);
    }
    getUserReview();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">Edit My Review</h1>
      <h3 className="uk-text-center">
        Share your thoughts with fellow readers.
      </h3>
      <br />
      <EditBookReviewForm review={review} setReview={setReview} />
    </div>
  );
}
