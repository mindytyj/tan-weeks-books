import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../BooksPage/BookCard";
import sendRequest from "../../utilities/send-request";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function GenresPage() {
  const [loading, setLoading] = useState(true);
  const { genreId } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getGenreBooks() {
      try {
        setLoading(true);
        const genreBooks = await sendRequest(
          `/api/books/genres/${parseInt(genreId)}`,
          "GET"
        );
        setBooks(genreBooks.rows);
        setLoading(false);
      } catch {
        console.error("Failed to retrieve books.");
      }
    }
    getGenreBooks();
  }, [genreId]);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return books.length > 0 ? (
    <div className="uk-container uk-padding">
      <div className="uk-section uk-section- uk-preserve-color">
        <div className="uk-container uk-margin-left uk-margin-right">
          <div
            className="uk-grid-column-medium uk-child-width-1-4@s uk-grid-match uk-text-center"
            data-uk-grid
          >
            {books.map((book) => {
              return (
                <div key={book.id}>
                  <BookCard book={book} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h3 className="uk-text-center">No Books Available.</h3>
  );
}
