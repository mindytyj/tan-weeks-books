import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../utilities/users-service";

export default function PasswordForm() {
  const userId = useAtomValue(userAtom);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("Error");
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  function handleChange(evt) {
    setNewPassword({ ...newPassword, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = { ...newPassword };
      delete formData.confirmPassword;
      const user = await updatePassword(userId.id, formData);
      setUser(user);

      if (user) {
        navigate(`/account/${user.id}/settings`);
      }
    } catch {
      setError("Failed to update password. Please try again.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline ">
          <span className="uk-form-icon" uk-icon="icon: pencil"></span>
          <input
            className="uk-input"
            type="password"
            aria-label="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline ">
          <span className="uk-form-icon" uk-icon="icon: pencil"></span>
          <input
            className="uk-input"
            type="password"
            aria-label="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
      >
        Confirm
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
