import SideNavBar from "../../components/SideNavBar/SideNavBar";
import WishlistTable from "./WishlistTable";

export default function WishlistPage() {
  return (
    <div className="uk-container uk-padding">
      <div data-uk-grid>
        <div className="uk-width-1-4@s">
          <SideNavBar />
        </div>
        <div className="uk-card uk-card-default uk-card-body uk-width-3-4@s">
          <h1 className="uk-text-center">My Wishlist</h1>
          <WishlistTable />
        </div>
      </div>
    </div>
  );
}
