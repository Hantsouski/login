import "./login-page.css";
import { LoginForm } from "./login-form/login-form";

export const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-page">
        <main>
          <h1>Sign in</h1>

          <ul>
            <li>
              Don't have an account?{" "}
              <a href="#sign-up">
                <strong>Sign up</strong>
              </a>
            </li>
            <li>
              Forgot password?{" "}
              <a href="#reset-password">
                <strong>Reset password</strong>
              </a>
            </li>
          </ul>

          <LoginForm />
        </main>

        <aside>
          <div className="frame">
            <img
              src="https://images.pexels.com/photos/824572/pexels-photo-824572.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
              srcSet="https://images.pexels.com/photos/824572/pexels-photo-824572.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1 1x, https://images.pexels.com/photos/824572/pexels-photo-824572.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2 2x"
              alt="Free Green Leaf Plant On Pot Stock Photo"
              role="presentation"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};
