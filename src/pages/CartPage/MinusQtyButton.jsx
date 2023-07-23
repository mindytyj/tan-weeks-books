import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function MinusQtyButton({ bookId, totalQty, setTotalQty }) {
  const user = useAtomValue(userAtom);

  async function minusQty() {
    if (totalQty === 1) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${bookId}`, "PUT", {
        qty: parseInt(totalQty) - 1,
      });
      setTotalQty(totalQty - 1);
    } catch {
      console.log("Failed to minus.");
    }
  }

  return (
    <button
      uk-icon="minus"
      ratio="0.5"
      className="uk-icon-button uk-margin-small-left"
      onClick={minusQty}
    ></button>
  );
}
