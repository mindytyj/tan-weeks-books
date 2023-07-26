import { Link } from "react-router-dom";
import RemoveWishlistItem from "./RemoveWishlistItem";

export default function WishlistItem({ book, setWishlist, wishlist }) {
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
      <td className="uk-table-middle">
        <RemoveWishlistItem
          book={book}
          setWishlist={setWishlist}
          wishlist={wishlist}
        />
      </td>
    </tr>
  );
}
