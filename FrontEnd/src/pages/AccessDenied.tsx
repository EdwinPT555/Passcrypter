import React from "react";

const AccessDenied = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#141414",
      }}
    >
      <img
        style={{ maxHeight: "90vh", maxWidth: "100vw", objectFit: "contain" }}
        src="https://wallpaperaccess.com/full/2134687.jpg"
        alt=""
      />
    </div>
  );
};

export default AccessDenied;
