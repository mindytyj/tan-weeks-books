import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";

export default function AddToCartButton({ book }) {
  const disable = parseInt(book.qty) === 0;
  const user = useAtomValue(userAtom);

  async function addToCart() {
    if (user === null) {
      return;
    }

    try {
      await sendRequest("/api/carts", "POST", {
        bookId: parseInt(book.id),
        qty: 1,
        userId: parseInt(user.id),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <button
      className="uk-button uk-button-primary"
      disabled={disable}
      onClick={addToCart}
    >
      Add to Cart
    </button>
  );
}
