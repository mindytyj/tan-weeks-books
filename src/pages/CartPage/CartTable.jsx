import { useAtomValue } from "jotai";
import CartItem from "./CartItem";
import { cartAtom } from "./cartContext";

export default function CartTable({ user }) {
  const cartItems = useAtomValue(cartAtom);

  return cartItems.length > 0 ? (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th className="uk-table-expand">Title</th>
          <th className="uk-table-small">Quantity</th>
          <th className="uk-table-small">Price</th>
          <th className="uk-table-small">Total</th>
          <th className="uk-table-small">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((book) => {
          return <CartItem book={book} userId={user.id} key={book.id} />;
        })}
      </tbody>
    </table>
  ) : (
    <h3 className="uk-text-center">Cart is Empty.</h3>
  );
}
