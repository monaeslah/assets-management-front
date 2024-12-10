import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuthContext } from "../../context/authContext";
import Over_the_Rhone from "../../assets/images/Over_the_Rhone.jpg";
import SignUpPage from "./signup";
import InputField from "../../components/Input";
import DreamButton from "../../components/button";
import passwordIcon from "../../assets/images/password.svg";
import emailIcon from "../../assets/images/email.svg";
import hideIcon from "../../assets/images/visibility_off.svg";
import showIcon from "../../assets/images/visibility_on.svg";
import { LoginForm } from "../../types/pages";

const Login: React.FC = () => {
  const { login, feedBackLogin } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [active, setActive] = useState<boolean>(true);

  const redirectSignup = () => {
    setActive(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <>
      {active ? (
        <div id="login-form">
          <div className="form-area">
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <h3>Login</h3>

                <InputField
                  iconBefore={emailIcon}
                  className="inputField mediumInput"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </InputField>

                <InputField
                  iconBefore={passwordIcon}
                  className="inputField mediumInput"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleInputChange}
                  />
                  <img
                    src={showPassword ? showIcon : hideIcon}
                    alt={showPassword ? "Show password" : "Hide password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="passwordToggleIcon"
                  />
                </InputField>

                <DreamButton
                  label="Submit"
                  enable={true}
                  size="medium"
                  className="primary-btn"
                  onClick={handleSubmit}
                />

                <p>
                  Create an account?{" "}
                  <span onClick={redirectSignup} className="underline">
                    Click here
                  </span>
                </p>
                <p>{feedBackLogin}</p>
              </div>
            </form>

            <div className="image-firm">
              <img src={Over_the_Rhone} alt="stary night painting" />
            </div>
          </div>
        </div>
      ) : (
        <SignUpPage />
      )}
    </>
  );
};

export default Login;
