import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { userAtom } from "../../utilities/userContext";

export default function SideNavBar() {
  const user = useAtomValue(userAtom);

  return (
    <div className="uk-width-1-2@s uk-width-2-5@m">
      <ul className="uk-nav uk-nav-default">
        <li className="uk-nav-header">My Account</li>
        <li>
          <Link to={`/account/${user.id}/settings`}>Settings</Link>
        </li>
        <li>
          <Link to={`/account/${user.id}/wishlist`}>Wishlist</Link>
        </li>
        <li>
          <Link to={`/account/${user.id}/order-history`}>Order History</Link>
        </li>
      </ul>
    </div>
  );
}
