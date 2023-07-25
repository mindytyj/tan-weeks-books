import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import OrderHistoryItem from "./OrderHistoryItem";
import { useEffect, useState } from "react";

export default function OrderHistoryTable() {
  const user = useAtomValue(userAtom);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    async function getOrderHistory() {
      try {
        const allOrderHistory = await sendRequest(
          `/api/orders/${user.id}`,
          "GET"
        );
        setOrderHistory(allOrderHistory);
      } catch {
        console.error("Unable to retrieve order history.");
      }
    }
    getOrderHistory();
  }, []);

  console.log(orderHistory);

  return orderHistory.length > 0 ? (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th className="uk-table-expand">Title</th>
          <th className="uk-table-small">Qty</th>
          <th className="uk-table-expand">Total</th>
        </tr>
      </thead>
      <tbody>
        {orderHistory.map((order) => {
          return <OrderHistoryItem order={order} />;
        })}
      </tbody>
    </table>
  ) : (
    <h3 className="uk-text-center">No Order History.</h3>
  );
}
