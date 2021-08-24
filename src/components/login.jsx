import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signGithub, signGoogle } from "../auth_google";

const Login = ({ firebase, login }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {});
  };
  const history = useHistory();

  const onGoogle = () => {
    signGoogle();
  };
  const onGithub = () => {
    signGithub();
  };
  return (
    <div>
      <button onClick={onGoogle}>Google Login</button>
      <button onClick={onGithub}>Github Login</button>
    </div>
  );
};

export default Login;
