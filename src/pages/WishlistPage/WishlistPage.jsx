import SideNavBar from "../../components/SideNavBar/SideNavBar";
import WishlistTable from "./WishlistTable";

export default function WishlistPage() {
  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">My Wishlist</h1>
      <div data-uk-grid>
        <div className="uk-width-1-3@s">
          <SideNavBar />
        </div>
        <div className="uk-width-1-2@s">
          <WishlistTable />
        </div>
      </div>
    </div>
  );
}
