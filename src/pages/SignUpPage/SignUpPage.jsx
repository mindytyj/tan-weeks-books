import { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">Sign Up as a T-WB Member</h1>
      <SignUpForm />
    </div>
  );
}
