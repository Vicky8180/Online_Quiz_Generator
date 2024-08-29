import React from "react";
import ReactDOM from "react-dom";
import "./DeletePortal.css";
import Taost from "../../../../../containers/toast/Toast";
export default function DeletePorta({
  ApiHandleDeletePortal,
  CloseDeletePortal,
}) {
  const element = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={portalContentStyle}>
        <DeletePage
          ApiHandleDeletePortal={ApiHandleDeletePortal}
          CloseDeletePortal={CloseDeletePortal}
        />
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

const DeletePage = ({ ApiHandleDeletePortal, CloseDeletePortal }) => {
  return (
    <>
      <div className="delete_body">
        <div className="delete_heading">
          Are you confirm you want to delete ?
        </div>
        <div className="delete_btns">
          <button className="delete_btns2" onClick={ApiHandleDeletePortal}>
            Confirm Delete
          </button>
          <button className="delete_btns1" onClick={CloseDeletePortal}>
            cancel
          </button>
        </div>
      </div>
    </>
  );
};
