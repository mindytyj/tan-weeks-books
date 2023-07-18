import SignUpForm from "./SignUpForm";

export default function SignUpPage({ setUser }) {
  return (
    <div className="uk-container uk-padding">
      <h1 className="uk-text-center">Sign Up as a T-WB Member</h1>
      <SignUpForm setUser={setUser} />
    </div>
  );
}
