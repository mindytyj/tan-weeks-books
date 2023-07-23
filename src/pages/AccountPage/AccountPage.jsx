import SideNavBar from "../../components/SideNavBar/SideNavBar";

export default function AccountPage() {
  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">My Account Settings</h1>
      <div data-uk-grid>
        <div className="uk-width-1-3@s">
          <SideNavBar />
        </div>
        <div className="uk-width-1-2@s"></div>
      </div>
    </div>
  );
}
