import React from "react";

const Login = ({ firebase, signGoogle }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };

  const onLogin = () => {
    signGoogle();
  };
  return (
    <div>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
