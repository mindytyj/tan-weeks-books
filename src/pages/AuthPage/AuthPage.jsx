import { Outlet, useNavigate } from "react-router-dom";

export default function AuthPage({ user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  return <Outlet />;
}
