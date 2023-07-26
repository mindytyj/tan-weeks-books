import { useNavigate } from "react-router-dom";

export default function EditBookButton({ book }) {
  const navigate = useNavigate();

  function editBook() {
    navigate(`/books/${book.id}/edit`);
  }

  return (
    <button className="uk-button uk-button-secondary" onClick={editBook}>
      Edit
    </button>
  );
}
