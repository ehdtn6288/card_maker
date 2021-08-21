import React from "react";
import { useHistory } from "react-router-dom";

const Prac = () => {
  const history = useHistory();
  return (
    <button
      onClick={() => {
        history.push("/");
      }}
    >
      Home
    </button>
  );
};

export default Prac;
