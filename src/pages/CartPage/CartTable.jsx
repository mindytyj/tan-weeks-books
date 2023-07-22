import CartItem from "./CartItem";

export default function CartTable({ cartItems, user }) {
  return (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th className="uk-table-expand">Title</th>
          <th className="uk-table-small">Quantity</th>
          <th className="uk-width-small">Price</th>
          <th className="uk-width-small">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((book) => {
          return <CartItem book={book} userId={user.id} />;
        })}
      </tbody>
    </table>
  );
}
