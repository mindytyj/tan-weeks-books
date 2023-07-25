import { Link } from "react-router-dom";
import ReviewButton from "./ReviewButton";

export default function OrderHistoryItem({ book }) {
  return (
    <tr>
      <td>
        <img
          className="uk-preserve-width uk-border-circle"
          src="images/avatar.jpg"
          width="40"
          height="40"
          alt=""
        />
      </td>
      <td className="uk-text-truncate">
        <Link to={`/books/${book.id}`} className="uk-button-link">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap">{book.qty}</td>
      <td className="uk-text-nowrap">{book.total}</td>
      <td>
        <ReviewButton bookId={book.id} />
      </td>
    </tr>
  );
}
