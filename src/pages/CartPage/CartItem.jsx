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
          className="uk-preserve-width"
          src={book.image_url}
          width="40"
          height="40"
          alt={book.title}
        />
      </td>
      <td className="uk-text-truncate uk-table-middle">
        <Link to={`/books/${book.id}`} className="uk-button-link">
          {book.title}
        </Link>
      </td>
      <td className="uk-text-nowrap uk-table-middle">
        <AddQtyButton
          book={book}
          totalQty={totalQty}
          setTotalQty={setTotalQty}
        />
        {totalQty}
        <MinusQtyButton
          book={book}
          totalQty={totalQty}
          setTotalQty={setTotalQty}
        />
      </td>
      <td className="uk-text-nowrap uk-table-middle">${book.price}</td>
      <td className="uk-text-nowrap uk-table-middle">
        ${Number(totalPrice).toFixed(2)}
      </td>
      <td className="uk-table-middle">
        <RemoveFromCartButton book={book} />
      </td>
    </tr>
  );
}
