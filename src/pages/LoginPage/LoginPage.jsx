import { useAtomValue } from "jotai";
import LoginForm from "./LoginForm";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">T-WB Member Login</h1>
      <LoginForm />
    </div>
  );
}
