import { useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import { useEffect, useState } from "react";
import BookReviewForm from "./BookReviewForm";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function BookReviewPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function getBookDetails() {
      setLoading(true);
      const retrieveBook = await sendRequest(`/api/books/${id}`, "GET");
      setBook(retrieveBook);
      setLoading(false);
    }
    getBookDetails();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">My Review</h1>
      <h3 className="uk-text-center">
        Share your thoughts with fellow readers.
      </h3>
      <br />
      <BookReviewForm book={book} />
    </div>
  );
}
