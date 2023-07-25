import { useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { cartAtom, cartTotalAtom } from "./cartContext";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [error, setError] = useState("");
  const cartItems = useAtomValue(cartAtom);
  const cartTotal = useAtomValue(cartTotalAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  async function handleCheckOut() {
    try {
      await sendRequest("/api/orders", "POST", {
        userId: user.id,
        cart: cartItems,
      });

      navigate(`/cart/${user.id}/order-confirmation`);
    } catch (err) {
      console.error(err.message);
      setError("Failed to check out. Please try again.");
    }
  }

  return (
    <div className="uk-width-1-2 uk-align-center">
      <div className="uk-card uk-card-default uk-card-body">
        <h3 className="uk-text-center">
          Total ${Number(cartTotal).toFixed(2)}
        </h3>
        <button
          className="uk-button uk-button-primary uk-align-center"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
        <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
      </div>
    </div>
  );
}
