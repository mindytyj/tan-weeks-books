import { Link } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "./cartContext";

export default function CartItem({ book, userId }) {
  const setCartItems = useSetAtom(cartAtom);
  const cartItems = useAtomValue(cartAtom);

  async function removeFromCart() {
    if (userId === null || userId === undefined) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${userId}/${book.id}`, "DELETE");
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== book.id));
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
      <td className="uk-text-truncate">
        <Link to={`/books/${book.id}`} className="uk-button-link">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap">{book.qty}</td>
      <td className="uk-text-nowrap">${book.price}</td>
      <td>
        <button
          className="uk-button uk-button-danger uk-button-small uk-text-center"
          type="button"
          onClick={removeFromCart}
        >
          X
        </button>
      </td>
    </tr>
  );
}
