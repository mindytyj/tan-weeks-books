import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";

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
      <div class="uk-child-width-1-4@m" uk-grid>
        {books.map((book) => {
          return (
            <div>
              <div className="uk-card uk-card-secondary">
                <div className="uk-card-media-top">
                  <img src="" width="200" height="200" alt="" />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title uk-text-center">{book.title}</h3>
                  <p className="uk-text-center">${book.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
