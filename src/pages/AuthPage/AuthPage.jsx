import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SignUpPage from "../SignUpPage/SignUpPage";
import LoginPage from "../LoginPage/LoginPage";

export default function AuthPage() {
  const [alreadyUser, setAlreadyUser] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/signup") {
      setAlreadyUser(false);
    } else {
      setAlreadyUser(true);
    }
  }, [location]);

  return <main>{alreadyUser ? <LoginPage /> : <SignUpPage />}</main>;
}
