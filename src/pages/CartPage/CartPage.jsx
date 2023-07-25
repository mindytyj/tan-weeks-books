import { useEffect } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import CheckOut from "./CheckOut";
import CartTable from "./CartTable";
import { cartAtom } from "./cartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const setCartItems = useSetAtom(cartAtom);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

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
            <CartTable user={user} />
          </div>
        </div>
        <CheckOut />
      </div>
    </div>
  );
}
