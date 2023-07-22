import { useAtomValue } from "jotai";
import { bookAtom } from "./bookContext";

export default function SubBookDetails() {
  const book = useAtomValue(bookAtom);

  return (
    <div className="uk-section uk-section-default uk-preserve-color">
      <div className="uk-container uk-margin-left uk-margin-right">
        <div className="uk-column-1-2 uk-column-divider">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <p>ISBN: {book.isbn}</p>
              <p>Pages: {book.pages}</p>
              <p>Genre: {book.genre_name}</p>
            </div>
            <div>
              <div className="uk-card uk-card-default uk-card-body">
                <p>Language: {book.language_name}</p>
                <p>Publisher: {book.publisher_name}</p>
                <p>Publication Date: {book.publication_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
