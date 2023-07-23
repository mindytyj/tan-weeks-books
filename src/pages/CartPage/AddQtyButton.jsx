import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function AddQtyButton({ bookId, totalQty, setTotalQty }) {
  const user = useAtomValue(userAtom);

  async function addQty() {
    if (totalQty === 10) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${bookId}`, "PUT", {
        qty: parseInt(totalQty) + 1,
      });
      setTotalQty(totalQty + 1);
    } catch {
      console.log("Failed to add.");
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
