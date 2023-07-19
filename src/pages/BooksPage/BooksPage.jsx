import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";

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
      <h1 className="uk-text-center">Books</h1>
      <div className="uk-grid-column-medium uk-child-width-1-4@s uk-grid-match uk-text-center uk-grid">
        {books.map((book) => {
          return (
            <div>
              <div className="uk-card uk-card-secondary">
                <div className="uk-card-media-top">
                  <Link to={`/books/${book.id}`}>
                    <img src="" width="300" height="300" alt="" />
                  </Link>
                </div>
                <div className="uk-card-body">
                  <p>${book.price}</p>
                  <button className="uk-button uk-button-primary uk-align-center">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
