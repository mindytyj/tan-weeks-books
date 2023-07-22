import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import CartItem from "./CartItem";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    async function getAllCartItems() {
      try {
        const allCartItems = await sendRequest(`/api/carts/${user.id}`, "GET");
        setCartItems(allCartItems.rows);
      } catch {
        console.error("Failed to retrieve cart items.");
      }
    }
    getAllCartItems();
  }, []);

  return (
    <div className="uk-container uk-padding">
      <div className="uk-section uk-section-secondary uk-preserve-color">
        <div className="uk-container uk-margin-left uk-margin-right">
          <h3 className="uk-text-center">My Cart</h3>
          <div className="uk-text-center" data-uk-grid>
            <div className="uk-width-3-4">
              {cartItems.map((book) => {
                return <CartItem book={book} />;
              })}
            </div>
            <div className="uk-width-1-4">
              <div className="uk-card uk-card-default uk-card-body">
                <h3>Total</h3>
                <button>Check Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
