import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useSetAtom } from "jotai";
import { userAtom } from "../../utilities/userContext";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useSetAtom(userAtom);

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Login Failed. Please Try Again.");
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline ">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input
            className="uk-input"
            type="email"
            aria-label="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="uk-margin uk-text-center">
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: lock"></span>
          <input
            className="uk-input"
            type="password"
            aria-label="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        className="uk-button uk-button-secondary uk-align-center"
        type="submit"
      >
        Login
      </button>
      <p className="uk-text-center uk-text-meta uk-text-danger">{error}</p>
    </form>
  );
}
