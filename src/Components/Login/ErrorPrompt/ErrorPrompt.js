import React, { useEffect } from "react";

const ErrorPrompt = ({ setErrorStatus }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorStatus(false);
    }, 4000);
  }, [setErrorStatus]);
  return <span className="error-prompt">Please enter a username!</span>;
};

export default ErrorPrompt;
