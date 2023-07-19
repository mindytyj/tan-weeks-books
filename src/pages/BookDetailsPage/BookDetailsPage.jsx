import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

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
      <h1 className="uk-text-center">{book.title}</h1>
      <div class="uk-section uk-section-secondary uk-preserve-color">
        <div class="uk-container"></div>
      </div>
      <div class="uk-section uk-section-secondary uk-preserve-color">
        <div class="uk-container">
          <div class="uk-card uk-card-default uk-card-body">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
      <div class="uk-section uk-section-secondary uk-preserve-color">
        <div class="uk-container">
          <div class="uk-grid-match">
            <div>
              <div class="uk-card uk-card-default uk-card-body">
                <p>ISBN: {book.isbn}</p>
                <p>Pages: {book.pages}</p>
                <p>Publisher: {book.publisher_name}</p>
                <hr />
                <p>Genre: {book.genre_name}</p>
                <p>Language: {book.language_name}</p>
                <p>Publication Date: {book.publication_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-section uk-section-muted">
        <div class="uk-container"></div>
        <Reviews />
      </div>
    </div>
  );
}
