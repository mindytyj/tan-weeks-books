import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function QtyCounter({ book }) {
  const [totalQty, setTotalQty] = useState(book.qty);
  const user = useAtomValue(userAtom);

  async function addQty() {
    if (totalQty === 10) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${book.id}`, "PUT", {
        qty: parseInt(totalQty) + 1,
      });
      setTotalQty(totalQty + 1);
    } catch {
      console.log("Failed to add.");
    }
  }

  async function minusQty() {
    if (totalQty === 1) {
      return;
    }

    try {
      await sendRequest(`/api/carts/${user.id}/${book.id}`, "PUT", {
        qty: parseInt(totalQty) - 1,
      });
      setTotalQty(totalQty - 1);
    } catch {
      console.log("Failed to minus.");
    }
  }

  return (
    <>
      <span
        uk-icon="plus"
        ratio="0.5"
        className="uk-margin-small-right"
        onClick={addQty}
      ></span>
      {totalQty}
      <span
        uk-icon="minus"
        ratio="0.5"
        className="uk-margin-small-left"
        onClick={minusQty}
      ></span>
    </>
  );
}
