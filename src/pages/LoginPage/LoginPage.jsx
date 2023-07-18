import LoginForm from "./LoginForm";

export default function LoginPage({ setUser }) {
  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">T-WB Member Login</h1>
      <LoginForm setUser={setUser} />
    </div>
  );
}
