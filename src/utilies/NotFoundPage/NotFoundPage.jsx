
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundpage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="not-found__button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
