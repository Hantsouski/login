import { FormEvent, useRef, useState } from "react";
import "./login-form.css";
import { PasswordRevealer } from "../password-revealer/password-revealer";
import { Loader } from "../loader/loader";

type Errors = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const [errors, setErrors] = useState<Errors>({});

  const [submitting, setSubmitting] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const errors: Errors = {};

    if (emailRef.current?.validity.valueMissing) {
      errors.email = "Enter your email address";
    }

    if (emailRef.current?.validity.typeMismatch) {
      errors.email = !emailRef.current.value.includes("@")
        ? "You need to enter the ‘at’ symbol in the email address"
        : "You need to enter valid email address";
    }

    if (passwordRef.current?.validity.valueMissing) {
      errors.password = "Enter your password";
    }

    if (passwordRef.current?.validity.tooShort) {
      errors.password = "Your password must contain at least 8 characters";
    }

    if (passwordRef.current?.value && !/\d/.test(passwordRef.current?.value)) {
      errors.password = "Your password must contain at least one number";
    }

    if (
      passwordRef.current?.value &&
      !/[a-zA-Z]/.test(passwordRef.current?.value)
    ) {
      errors.password = "Your password must contain at least one letter";
    }

    return errors;
  };

  const sendRequest = () => {
    return new Promise<void>((res) => {
      setTimeout(() => res(), 5000);
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({});

    const errors = validateForm();

    if (Object.keys(errors).length) {
      return setErrors(errors);
    }

    setSubmitting(true);

    try {
      await sendRequest();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="login-form" noValidate onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="email">Email address</label>
        {errors.email && (
          <span id="email-error" className="form-error">
            ⚠️ {errors.email}
          </span>
        )}
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </div>
      <div className="form-field">
        <label htmlFor="current-password">Password</label>
        <span id="password-hint" className="form-hint">
          Must contain eight or more characters with a mix of letters and
          numbers.
        </span>
        {errors.password && (
          <span id="password-error" className="form-error">
            ⚠️ {errors.password}
          </span>
        )}
        <PasswordRevealer
          ref={passwordRef}
          id="current-password"
          name="password"
          required
          type="password"
          autoComplete="current-password"
          minLength={8}
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby={
            errors.password ? "password-hint password-error" : "password-hint"
          }
        />
      </div>
      <button className="submit-button" disabled={submitting}>
        {submitting ? <Loader /> : "Sign in"}
      </button>
    </form>
  );
};
