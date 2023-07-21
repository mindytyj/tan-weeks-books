import { useAtomValue } from "jotai";
import { useState } from "react";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";

export default function AddToCartButton({ book }) {
  const disable = parseInt(book.qty) === 0;
  const user = useAtomValue(userAtom);
  const [cartMsg, setCartMsg] = useState("");

  async function addToCart() {
    if (user === null) {
      setCartMsg("Join as a T-WB member to add to cart.");
      return;
    }

    try {
      await sendRequest("/api/carts", "POST", {
        bookId: parseInt(book.id),
        qty: 1,
        userId: parseInt(user.id),
      });
      setCartMsg("Book has been successfully added to your cart.");
    } catch {
      setCartMsg("The book is already in your cart. Consider checking out!");
    }
  }

  console.log(cartMsg);

  return (
    <>
      <button
        className="uk-button uk-button-primary"
        disabled={disable}
        onClick={addToCart}
        data-uk-toggle="target: #addToCartModal"
      >
        Add to Cart
      </button>
      <div id="addToCartModal" className="uk-flex-top" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button
            className="uk-modal-close-default"
            type="button"
            data-uk-close
          />
          <p className="uk-text-center">{cartMsg}</p>
        </div>
      </div>
    </>
  );
}
