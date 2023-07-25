import { Link } from "react-router-dom";

export default function OrderHistoryItem({ order }) {
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
        <Link to={`/books/${order.id}`} className="uk-button-link">
          {order.title}
        </Link>
      </td>
      <td className="uk-text-nowrap">{order.qty}</td>
      <td className="uk-text-nowrap">{order.total}</td>
    </tr>
  );
}
