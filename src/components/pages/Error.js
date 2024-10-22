import React from 'react';
import {NavLink} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="err-page">
      <h1 className="err-title">Page Is Not Found /404</h1>
      <NavLink className="err-link" to="/">Go Main</NavLink>
    </div>
  );
};

export default ErrorPage;
