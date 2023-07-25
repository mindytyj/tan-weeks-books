import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import MainBookDetails from "./MainBookDetails";
import BookDescription from "./BookDescription";
import SubBookDetails from "./SubBookDetails";
import { useSetAtom } from "jotai";
import { bookAtom } from "./bookContext";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function BooksDetailPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const setBook = useSetAtom(bookAtom);

  useEffect(() => {
    async function getBookDetails() {
      setLoading(true);
      const retrievedBook = await sendRequest(`/api/books/${id}`, "GET");
      setBook(retrievedBook);
      setLoading(false);
    }
    getBookDetails();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <MainBookDetails />
      <BookDescription />
      <SubBookDetails />
      <Reviews />
    </div>
  );
}
