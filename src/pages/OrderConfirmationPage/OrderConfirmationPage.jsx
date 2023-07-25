import { useAtomValue } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { userAtom } from "../../utilities/userContext";

export default function OrderConfirmationPage() {
  const user = useAtomValue(userAtom);
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!user || user.id !== parseInt(userId)) {
    navigate("/");
  }

  function returnToMain() {
    navigate("/");
  }

  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">Your Order is Confirmed!</h1>
      <div className="uk-container uk-margin-left uk-margin-right">
        <div className="uk-width-3-4 uk-align-center">
          <h3 className="uk-text-center">Thank you for shopping with us.</h3>
          <button
            className="uk-button uk-button-secondary uk-align-center"
            onClick={returnToMain}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
