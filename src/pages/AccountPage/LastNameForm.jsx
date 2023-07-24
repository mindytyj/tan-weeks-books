import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";
import { useNavigate } from "react-router-dom";
import { updateLastName } from "../../utilities/users-service";

export default function LastNameForm() {
  const userId = useAtomValue(userAtom);
  const [newLastName, setNewLastName] = useState({ lastName: "" });
  const [error, setError] = useState("Error");
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  function handleChange(evt) {
    setNewLastName({ lastName: evt.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await updateLastName(userId.id, newLastName);
      setUser(user);

      if (user) {
        navigate(`/account/${user.id}/settings`);
      }
    } catch {
      setError("Failed to update last name. Please try again.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline ">
          <span className="uk-form-icon" uk-icon="icon: pencil"></span>
          <input
            className="uk-input"
            type="text"
            aria-label="lastName"
            name="lastName"
            placeholder="Last Name"
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
