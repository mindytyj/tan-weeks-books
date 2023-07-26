import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import CheckOut from "./CheckOut";
import CartTable from "./CartTable";
import { cartAtom, cartTotalAtom } from "./cartContext";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const user = useAtomValue(userAtom);
  const setCartItems = useSetAtom(cartAtom);
  const setCartTotal = useSetAtom(cartTotalAtom);
  const cartTotal = useAtomValue(cartTotalAtom);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    async function getAllCartItems() {
      try {
        setLoading(true);
        const allCartItems = await sendRequest(`/api/carts/${user.id}`, "GET");

        let cart = 0;
        allCartItems.rows.map(
          (cartItem) => (cart += parseFloat(cartItem.price * cartItem.qty))
        );

        setCartItems(allCartItems.rows);
        setCartTotal(cart);
        setLoading(false);
      } catch {
        console.error("Failed to retrieve cart items.");
      }
    }
    getAllCartItems();
  }, [cartTotal]);

  if (loading === true) {
    return <LoadingScreen />;
  }

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
