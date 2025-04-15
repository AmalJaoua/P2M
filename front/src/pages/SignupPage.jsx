import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";

function SignupPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const IsInvalid =
    password === "" ||
    emailAddress === "" ||
    firstName === "" ||
    confirmPassword === "" ||
    !passwordsMatch;

  async function handleSubmit(event) {
    event.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify({
          username: firstName,
          email: emailAddress,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error from backend if available
        throw new Error(data.message || "Signup failed");
      }

      // Reset form
      setFirstName("");
      setEmailAddress("");
      setPassword("");
      setConfirmPassword("");
      setPasswordsMatch(true);

      // Redirect to /browse or wherever you want
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <NavBar className="navbar-signin">
          <Logo />
        </NavBar>
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSubmit} method="POST">
            <SignFormTitle>Sign Up</SignFormTitle>
            {error && <SignFormError>{error}</SignFormError>}
            <SignFormInput
              type="text"
              placeholder="Full Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              value={confirmPassword}
              onChange={({ target }) => {
                setConfirmPassword(target.value);
                if (error === "Passwords do not match") setPasswordsMatch(true);
              }}
            />
            
            <SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
            <SignFormText>
              Already a user?
              <SignFormLink href="/signin">Sign in now.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SignupPage;
