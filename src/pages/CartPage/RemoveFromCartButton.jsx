import sendRequest from "../../utilities/send-request";
import { useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "./cartContext";
import { userAtom } from "../../utilities/userContext";

export default function RemoveFromCartButton({ book }) {
  const user = useAtomValue(userAtom);
  const setCartItems = useSetAtom(cartAtom);
  const cartItems = useAtomValue(cartAtom);

  async function removeFromCart() {
    if (user.id === null || user.id === undefined) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${book.id}`, "DELETE");
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== book.id));
    } catch {
      console.log("Failed to delete book from cart.");
    }
  }

  return (
    <button
      className="uk-button uk-button-danger uk-button-small uk-text-center"
      type="button"
      onClick={removeFromCart}
    >
      X
    </button>
  );
}
