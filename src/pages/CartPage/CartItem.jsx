import { Link } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function CartItem({ book, user }) {
  async function removeFromCart() {
    if (user === null || user === undefined) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user}/${book.id}`, "DELETE");
    } catch {
      console.log("Failed to delete book from cart.");
    }
  }

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
      <td className="uk-table-link">
        <Link to={`/books/${book.id}`} className="uk-link-reset">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap">{book.qty}</td>
      <td className="uk-text-nowrap">${book.price}</td>
      <td>
        <button
          className="uk-button uk-button-default"
          type="button"
          onClick={removeFromCart}
        >
          X
        </button>
      </td>
    </tr>
  );
}
