import React from "react";
import logo from "../assets/load.gif";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed", // Ensures it covers the whole viewport
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent to give a loading effect
        zIndex: 9999, // High z-index to ensure it overlays other content
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "#333",
      }}
    >
      {/* Hang on tite
      <br /> */}
      <img src="../images/load.gif" />
      Loading ...
    </div>
  );
};

export default LoadingScreen;
