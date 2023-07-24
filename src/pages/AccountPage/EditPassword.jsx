import SideNavBar from "../../components/SideNavBar/SideNavBar";
import PasswordForm from "./PasswordForm";

export default function EditPassword() {
  return (
    <div className="uk-container uk-padding">
      <div data-uk-grid>
        <div className="uk-width-1-4@s">
          <SideNavBar />
        </div>
        <div className="uk-card uk-card-default uk-card-body uk-width-3-4@s">
          <h1 className="uk-text-center">Change Password</h1>
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
