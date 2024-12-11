import React, { useState, ChangeEvent, FormEvent } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import InputField from "../../components/Input";
import AssetButton from "../../components/button";
import Login from "./login";
import Over_the_Rhone from "../../assets/images/Over_the_Rhone.jpg";
import { SignUpForm, SignUpPageProps } from "../../types/pages";
import { useAuthContext } from "../../context/authContext";

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const { signUp, feedBackSignUp } = useAuthContext();
  const [form, setForm] = useState<SignUpForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [login, setLogin] = useState<boolean>(true);

  const redirectLogin = () => {
    setLogin(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { username, email, password, confirmPassword } = form;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await signUp({ username, email, password, confirmPassword });
      setSuccess("Account created successfully!");
    } catch (err) {
      setError(feedBackSignUp || "Failed to create account.");
      console.log("there is an error", err);
    }
  };

  return (
    <>
      {login ? (
        <div id="login-form">
          <div className="form-area">
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <InputField className="inputField mediumInput">
                  <PersonIcon className="icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={form.username}
                    placeholder="Create a username"
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField className="inputField mediumInput">
                  <EmailIcon className="icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter a valid email"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </InputField>
                <InputField className="inputField mediumInput">
                  <LockIcon className="icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField className="inputField mediumInput">
                  <LockIcon className="icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="Repeat created password"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                  />
                </InputField>

                <AssetButton
                  label="Sign up"
                  enable={true}
                  size="medium"
                  className="primary-btn"
                  onClick={() =>
                    document
                      .querySelector("form")
                      ?.dispatchEvent(new Event("submit"))
                  }
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <p>
                  Already have an account?{" "}
                  <span onClick={redirectLogin} className="underline">
                    Click here
                  </span>
                </p>
              </div>
            </form>
            <div className="image-firm">
              <img src={Over_the_Rhone} alt="Starry night painting" />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default SignUpPage;
