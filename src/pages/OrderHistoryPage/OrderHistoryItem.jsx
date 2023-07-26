import { Link } from "react-router-dom";
import ReviewButton from "./ReviewButton";

export default function OrderHistoryItem({ book }) {
  return (
    <tr>
      <td>
        <img
          className="uk-preserve-width"
          src={book.image_url}
          width="40"
          height="40"
          alt={book.title}
        />
      </td>
      <td className="uk-text-truncate uk-table-middle">
        <Link to={`/books/${book.id}`} className="uk-button-link">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap uk-table-middle">{book.qty}</td>
      <td className="uk-text-nowrap uk-table-middle">
        ${Number(book.total).toFixed(2)}
      </td>
      <td className="uk-table-middle">
        <ReviewButton bookId={book.id} />
      </td>
    </tr>
  );
}
