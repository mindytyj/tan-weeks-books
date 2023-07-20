import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import MainBookDetails from "./MainBookDetails";
import BookDescription from "./BookDescription";
import SubBookDetails from "./SubBookDetails";

export default function BooksDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    async function getBookDetails() {
      const retrievedBook = await sendRequest(`/api/books/${id}`, "GET");
      setBook(retrievedBook);
    }
    getBookDetails();
  }, []);

  return (
    <div className="uk-container uk-padding">
      <MainBookDetails book={book} />
      <BookDescription book={book} />
      <SubBookDetails book={book} />
      <Reviews />
    </div>
  );
}
