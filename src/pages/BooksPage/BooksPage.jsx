import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import BookCard from "./BookCard";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      try {
        const allBooks = await sendRequest("/api/books", "GET");
        setBooks(allBooks.rows);
      } catch {
        console.error("Failed to retrieve books.");
      }
    }
    getAllBooks();
  }, []);

  return (
    <div className="uk-container uk-padding">
      <div className="uk-section uk-section-secondary uk-preserve-color">
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
  );
}
