import { useNavigate } from "react-router-dom";

export default function AddBookButton() {
  const navigate = useNavigate();

  function addBook() {
    navigate("/books/add");
  }

  return (
    <button
      className="uk-icon-button uk-button-secondary uk-align-right"
      uk-icon="plus-circle"
      onClick={addBook}
    ></button>
  );
}
