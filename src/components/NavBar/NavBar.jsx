import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function NavBar() {
  const setUser = useSetAtom(userAtom);
  const user = useAtomValue(userAtom);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="uk-navbar-container">
      <div className="uk-container">
        <div data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <Link to={"/"} className="uk-navbar-item uk-logo">
                <li>Tan-Weeks Books</li>
              </Link>
              <li>
                <Link to={"/books"}>All Books</Link>
              </li>
              <li>
                <Link>Genres</Link>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-nav-header">Genres</li>
                    <li>
                      <Link to={"/genres/1"}>Horror</Link>
                    </li>
                    <li>
                      <Link to={"/genres/2"}>Poetry</Link>
                    </li>
                    <li>
                      <Link to={"/genres/3"}>Thrillers</Link>
                    </li>
                    <li>
                      <Link to={"/genres/4"}>Romance</Link>
                    </li>
                    <li>
                      <Link to={"/genres/5"}>History</Link>
                    </li>
                    <li>
                      <Link to={"/genres/6"}>Self-Help</Link>
                    </li>
                    <li>
                      <Link to={"/genres/7"}>Biography</Link>
                    </li>
                    <li>
                      <Link to={"/genres/9"}>Kids</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <Link to={"/cart"}>
                  <span uk-icon="icon: cart"></span>
                </Link>
              </li>
              <li>
                <Link>Account</Link>
                <div className="uk-navbar-dropdown">
                  {user ? (
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li className="uk-nav-header">
                        {user.first_name}'s Account
                      </li>
                      <li>
                        <Link to={`/account/${user.id}/settings`}>
                          Account Settings
                        </Link>
                      </li>
                      <li>
                        <Link to={`/account/${user.id}/wishlist`}>
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link to={`/account/${user.id}/order-history`}>
                          Order History
                        </Link>
                      </li>
                      <li className="uk-nav-divider"></li>
                      <li onClick={handleLogOut}>
                        <Link to={"/"}>Sign Out</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <Link to={"/login"}>Login</Link>
                      </li>
                      <li className="uk-nav-divider"></li>
                      <li>
                        <Link to={"/signup"}>Sign Up</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
