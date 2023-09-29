import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    // Mail ve şifre
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // Eğer hata yoksa girişi yap
    if (!emailError && !passwordError) {
      console.log("Email:", email);
      console.log("Password:", password);

      // Burasi giris icin
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <br></br>
      <form>
        <div className="login-input">
          <input
            type="email"
            placeholder="Email or User Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="login-error">Email cannot be empty!</p>}
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="login-error">Password cannot be empty!</p>
          )}
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
