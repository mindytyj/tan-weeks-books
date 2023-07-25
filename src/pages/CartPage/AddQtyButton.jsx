import sendRequest from "../../utilities/send-request";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { cartTotalAtom } from "./cartContext";

export default function AddQtyButton({ book, totalQty, setTotalQty }) {
  const user = useAtomValue(userAtom);
  const setCartTotal = useSetAtom(cartTotalAtom);
  let cartTotal = useAtomValue(cartTotalAtom);

  async function addQty() {
    if (totalQty === 10) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${book.id}`, "PUT", {
        qty: parseInt(totalQty) + 1,
      });
      setTotalQty(totalQty + 1);
      setCartTotal((cartTotal += parseFloat(book.price)));
    } catch (error) {
      console.error(error.message);
      console.log("Failed to increase quantity.");
    }
  }

  return (
    <button
      uk-icon="plus"
      ratio="0.5"
      className="uk-icon-button uk-margin-small-right"
      onClick={addQty}
    ></button>
  );
}
