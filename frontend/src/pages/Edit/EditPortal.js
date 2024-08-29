import React from "react";
import ReactDOM from "react-dom";
export default function EditPortal({ component, element }) {
  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={portalContentStyle}>{component}</div>
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
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(5px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const portalContentStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  zIndex: 1001,
  position: "relative",
};
