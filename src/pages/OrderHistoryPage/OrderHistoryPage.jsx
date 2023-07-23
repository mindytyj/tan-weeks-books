import SideNavBar from "../../components/SideNavBar/SideNavBar";

export default function OrderHistoryPage() {
  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">My Order History</h1>
      <div data-uk-grid>
        <div className="uk-width-1-3@s">
          <SideNavBar />
        </div>
        <div className="uk-width-1-2@s"></div>
      </div>
    </div>
  );
}
