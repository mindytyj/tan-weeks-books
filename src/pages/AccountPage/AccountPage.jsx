import SideNavBar from "../../components/SideNavBar/SideNavBar";
import AccountTable from "./AccountTable";

export default function AccountPage() {
  return (
    <div className="uk-container uk-padding">
      <div data-uk-grid>
        <div className="uk-width-1-4@s">
          <SideNavBar />
        </div>
        <div className="uk-card uk-card-default uk-card-body uk-width-3-4@s">
          <h1 className="uk-text-center">My Account Settings</h1>
          <AccountTable />
        </div>
      </div>
    </div>
  );
}
