import { useAtomValue } from "jotai";
import { Outlet, useNavigate } from "react-router-dom";
import { adminAtom } from "../../utilities/adminContext";
import { useEffect } from "react";

export default function AdminAuthPage({ user }) {
  const isAdmin = useAtomValue(adminAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  return <Outlet />;
}
