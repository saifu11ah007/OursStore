import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/loader.css";

export default function HangerLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="hanger-loader">
        <div className="hanger"></div>
        <h5 className="text mt-4">Loading your style...</h5>
      </div>
    </div>
  );
}
