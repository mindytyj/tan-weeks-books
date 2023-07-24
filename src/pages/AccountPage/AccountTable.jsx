import { useAtomValue } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";

export default function AccountTable() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  function handleEdit(event) {
    navigate(`/account/${user.id}/settings/edit/${event.target.name}`);
  }

  return (
    <table className="uk-table uk-table-justify">
      <thead>
        <tr>
          <th className="uk-table-expand"></th>
          <th className="uk-table-expand"></th>
          <th className="uk-width-expand"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="uk-text-bold">First Name </td>
          <td>{user.first_name}</td>
          <td>
            <button
              className="uk-button uk-button-secondary uk-button-small"
              name="first-name"
              onClick={handleEdit}
            >
              Edit
            </button>
          </td>
        </tr>
        <tr>
          <td className="uk-text-bold">Last Name </td>
          <td>{user.last_name}</td>
          <td>
            <button
              className="uk-button uk-button-secondary uk-button-small"
              name="last-name"
              onClick={handleEdit}
            >
              Edit
            </button>
          </td>
        </tr>
        <tr>
          <td className="uk-text-bold">Email</td>
          <td>{user.email}</td>
          <td>
            <button
              className="uk-button uk-button-secondary uk-button-small"
              name="email"
              onClick={handleEdit}
            >
              Edit
            </button>
          </td>
        </tr>
        <tr>
          <td className="uk-text-bold">Change Password</td>
          <td></td>
          <td>
            <button
              className="uk-button uk-button-secondary uk-button-small"
              name="password"
              onClick={handleEdit}
            >
              Change
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
