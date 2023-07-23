import { Link } from "react-router-dom";
import RemoveWishlistItem from "./RemoveWishlistItem";

export default function WishlistItem({ book, setWishlist, wishlist }) {
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
      <td>
        <RemoveWishlistItem
          book={book}
          setWishlist={setWishlist}
          wishlist={wishlist}
        />
      </td>
    </tr>
  );
}
