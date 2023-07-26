import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import BookCard from "./BookCard";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { adminAtom } from "../../utilities/adminContext";
import AddBookButton from "../AddBookPage/AddBookButton";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function BooksPage() {
  const [loading, setLoading] = useState(true);
  const user = useAtomValue(userAtom);
  const isAdmin = useAtomValue(adminAtom);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      try {
        setLoading(true);
        const allBooks = await sendRequest("/api/books", "GET");
        setBooks(allBooks.rows);
        setLoading(false);
      } catch {
        console.error("Failed to retrieve books.");
      }
    }
    getAllBooks();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <div className="uk-section uk-section- uk-preserve-color">
        <div className="uk-container uk-margin-left uk-margin-right">
          {user && isAdmin ? <AddBookButton /> : <></>}
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
