import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import CheckOut from "./CheckOut";
import CartTable from "./CartTable";

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
      <h1 className="uk-text-center">My Cart</h1>
      <div className="uk-container uk-margin-left uk-margin-right">
        <div className="uk-width-3-4 uk-align-center">
          <div className="uk-overflow-auto">
            <CartTable cartItems={cartItems} user={user} />
          </div>
        </div>
        <CheckOut />
      </div>
    </div>
  );
}
