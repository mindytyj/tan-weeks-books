import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import sendRequest from "../../utilities/send-request";
import OrderHistoryItem from "./OrderHistoryItem";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function OrderHistoryTable() {
  const [loading, setLoading] = useState(true);
  const user = useAtomValue(userAtom);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    async function getOrderHistory() {
      try {
        setLoading(true);
        const allOrderHistory = await sendRequest(
          `/api/orders/${user.id}`,
          "GET"
        );
        setOrderHistory(allOrderHistory);
        setLoading(false);
      } catch {
        console.error("Unable to retrieve order history.");
      }
    }
    getOrderHistory();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return orderHistory.length > 0 ? (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-shrink"></th>
          <th className="uk-table-expand">Title</th>
          <th className="uk-table-small">Qty</th>
          <th className="uk-table-small">Total</th>
          <th className="uk-table-small"></th>
        </tr>
      </thead>
      <tbody>
        {orderHistory.map((book, index) => {
          return <OrderHistoryItem book={book} key={index} />;
        })}
      </tbody>
    </table>
  ) : (
    <h3 className="uk-text-center">No Order History.</h3>
  );
}
