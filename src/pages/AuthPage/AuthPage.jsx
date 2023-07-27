import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthPage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <Outlet />;
}
