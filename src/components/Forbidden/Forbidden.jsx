import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../../animations/login.json";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl text-center">
        <div className="card-body space-y-4">
          {/* Lottie Animation */}
          <div className="w-56 mx-auto">
            <Lottie animationData={forbiddenAnimation} loop />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-error">
            403 – Access Forbidden
          </h2>

          {/* Description */}
          <p className="text-base-content/70">
            You don’t have permission to access this page. This route is
            restricted to administrators only.
          </p>

          {/* Buttons */}
          <div className="card-actions justify-center gap-3 pt-4">
            <Link to="/" className="btn btn-outline btn-primary">
              Home
            </Link>
            <Link to="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
