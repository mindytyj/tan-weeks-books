import SideNavBar from "../../components/SideNavBar/SideNavBar";
import LastNameForm from "./LastNameForm";

export default function EditLastName() {
  return (
    <div className="uk-container uk-padding">
      <div data-uk-grid>
        <div className="uk-width-1-4@s">
          <SideNavBar />
        </div>
        <div className="uk-card uk-card-default uk-card-body uk-width-3-4@s">
          <h1 className="uk-text-center">Edit Last Name</h1>
          <LastNameForm />
        </div>
      </div>
    </div>
  );
}
