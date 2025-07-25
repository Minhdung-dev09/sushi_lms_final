import React from "react";

const spinnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const imgStyle = {
  width: "60px",
  height: "60px",
};

export default function LoadingSpinner() {
  return (
    <div style={spinnerStyle}>
      <img
        src="/infinite-spinner.svg"
        alt="Loading..."
        style={imgStyle}
      />
    </div>
  );
} 