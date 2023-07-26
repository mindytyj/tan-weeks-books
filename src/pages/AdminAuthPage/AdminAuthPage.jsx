import { useAtomValue } from "jotai";
import { Outlet, useNavigate } from "react-router-dom";
import { adminAtom } from "../../utilities/adminContext";

export default function AdminAuthPage({ user }) {
  const isAdmin = useAtomValue(adminAtom);
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    navigate("/");
  }

  return <Outlet />;
}
