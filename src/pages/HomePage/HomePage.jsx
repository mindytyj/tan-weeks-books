import NewArrivals from "./NewArrivals";
import Promotions from "./Promotions";

export default function HomePage() {
  return (
    <div className="uk-container">
      <Promotions />
      <NewArrivals />
    </div>
  );
}
