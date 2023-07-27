import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import { useNavigate } from "react-router-dom";

export default function AddToCartButton({ book }) {
  const disable = parseInt(book.qty) === 0;
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  async function addToCart() {
    if (user === null) {
      return navigate("/login");
    }

    try {
      await sendRequest("/api/carts", "POST", {
        bookId: parseInt(book.id),
        qty: 1,
        userId: parseInt(user.id),
      });
      navigate("/cart");
    } catch {
      console.log("Book is already in cart.");
      navigate("/cart");
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
