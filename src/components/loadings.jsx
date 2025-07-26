import React from "react";

export default function Loading({ message = "Chờ chút sushi đang chế biến..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/infinite-spinner.svg"
        alt="Loading..."
        className="w-12 h-12 mb-6 animate-spin"
        style={{ display: 'block' }}
      />
      <p className="text-primary-600 text-lg text-center">{message}</p>
    </div>
  );
} 