import { useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function DeleteBookButton({ book }) {
  const navigate = useNavigate();

  async function deleteBook() {
    try {
      await sendRequest(`/api/books/${book.id}`, "DELETE");
      navigate("/books");
    } catch (error) {
      console.error(error.message);
      console.log("Failed to delete book.");
    }
  }

  return (
    <button
      className="uk-icon-button uk-button-danger uk-margin-left "
      uk-icon="trash"
      onClick={deleteBook}
    />
  );
}
