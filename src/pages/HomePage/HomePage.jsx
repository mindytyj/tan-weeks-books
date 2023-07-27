import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Promotions from "./Promotions";
import NewArrivals from "./NewArrivals";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    async function getPromotions() {
      try {
        setLoading(true);
        const books = await sendRequest("/api/promotions", "GET");
        setPromotions(books);
        setLoading(false);
      } catch {
        console.error("Failed to retrieve promotions.");
      }
    }
    getPromotions();
  }, []);

  if (loading === true) {
    return <LoadingScreen />;
  }

  return (
    <div className="uk-container uk-padding">
      <Promotions promotions={promotions} />
      <NewArrivals />
    </div>
  );
}
