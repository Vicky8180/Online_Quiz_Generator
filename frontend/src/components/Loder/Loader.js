import React from "react";
import "./Loader.css";
import ReactDOM from "react-dom";

export default function Loader() {
  const element = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={portalContentStyle}>
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    </div>,
    element
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // background: 'rgba(0, 0, 0, 0.5)',
  background: "rgba(0, 0, 0, 0.81)",
  backdropFilter: "blur(0.6px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const portalContentStyle = {
  background: "white",
  // padding: '20px',
  borderRadius: "8px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  zIndex: 1001,
  position: "relative",
};
