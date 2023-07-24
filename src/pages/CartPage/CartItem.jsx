import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RemoveFromCartButton from "./RemoveFromCartButton";
import AddQtyButton from "./AddQtyButton";
import MinusQtyButton from "./MinusQtyButton";
import sendRequest from "../../utilities/send-request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { cartAtom } from "./cartContext";

export default function CartItem({ book }) {
  const user = useAtomValue(userAtom);
  const cartItems = useAtomValue(cartAtom);
  const [totalQty, setTotalQty] = useState(book.qty);
  const totalPrice = totalQty * book.price;

  useEffect(() => {
    async function getBookQty() {
      const bookQty = await sendRequest(
        `/api/carts/${user.id}/${book.id}`,
        "GET"
      );
      setTotalQty(bookQty.qty);
    }
    getBookQty();
  }, [cartItems]);

  return (
    <tr>
      <td>
        <img
          className="uk-preserve-width uk-border-circle"
          src="images/avatar.jpg"
          width="40"
          height="40"
          alt=""
        />
      </td>
      <td className="uk-text-truncate">
        <Link to={`/books/${book.id}`} className="uk-button-link">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap">
        <AddQtyButton
          bookId={book.id}
          totalQty={totalQty}
          setTotalQty={setTotalQty}
        />
        {totalQty}
        <MinusQtyButton
          bookId={book.id}
          totalQty={totalQty}
          setTotalQty={setTotalQty}
        />
      </td>
      <td className="uk-text-nowrap">${book.price}</td>
      <td className="uk-text-nowrap">${Number(totalPrice).toFixed(2)}</td>
      <td>
        <RemoveFromCartButton book={book} />
      </td>
    </tr>
  );
}
