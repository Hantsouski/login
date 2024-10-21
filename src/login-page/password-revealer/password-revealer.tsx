import {
  ComponentProps,
  ForwardedRef,
  RefObject,
  forwardRef,
  useState,
} from "react";

import "./password-revealer.css";

interface PasswordRevealerProps extends ComponentProps<"input"> {}

export const PasswordRevealer = forwardRef(
  (
    { ...props }: PasswordRevealerProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onButtonClick = () => {
      const nextShowPassword = !showPassword;

      setShowPassword(nextShowPassword);
      const passwordInput = (ref as RefObject<HTMLInputElement>)?.current;

      if (passwordInput) {
        passwordInput.type = nextShowPassword ? "text" : "password";
      }
    };

    return (
      <div className="password-revealer">
        <input ref={ref} type="password" {...props} />
        <button
          type="button"
          onClick={onButtonClick}
          aria-label={
            showPassword
              ? "Hide your password."
              : "Show password as plain text on the screen."
          }
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
);
