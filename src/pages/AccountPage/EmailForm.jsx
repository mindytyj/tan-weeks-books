import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";
import { updateEmail } from "../../utilities/users-service";

export default function EmailForm() {
  const userId = useAtomValue(userAtom);
  const [newEmail, setNewEmail] = useState({ email: "" });
  const [error, setError] = useState("");
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  function handleChange(evt) {
    setNewEmail({ email: evt.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await updateEmail(userId.id, newEmail);
      setUser(user);

      if (user) {
        navigate(`/account/${user.id}/settings`);
      }
    } catch {
      setError("Failed to update email. Please try again.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline ">
          <span className="uk-form-icon" uk-icon="icon: pencil"></span>
          <input
            className="uk-input"
            type="email"
            aria-label="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
      >
        Save
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
