import React from "react";
import "./SharePage.css";
import shareCrossIcon from "../../../../../assets/Icons/shareCrossIcon.png";
import copyIcon from "../../../../../assets/Icons/copyIcon.png";
import CopiedEffect from "../../../../../containers/CopiedEffect";
export default function SharePage({ closeModal, url }) {
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  }
  const ApplyCopiEffect = () => {
    const element = document.getElementById("copied");

    CopiedEffect(element, "-600%", "-500%");

    copyToClipboard(url);
  };
  const share = () => {
    const element = document.getElementById("copied");

    CopiedEffect(element, "-600%", "-500%");

    copyToClipboard(url);
    closeModal();
  };

  return (
    <>
      <div className="share_page_container">
        <div className="share_page_cross">
          <img
            alt="del"
            style={{ cursor: "pointer" }}
            onClick={() => closeModal()}
            src={shareCrossIcon}
          />
        </div>
        <p>Congrats your Quiz is Published!</p>

        <div className="share_page_input">
          <input placeholder={url} />
          <div id="copied">
            <img alt="copy" onClick={ApplyCopiEffect} src={copyIcon} />
          </div>
        </div>
        <div className="share_page_btn">
          {" "}
          <button onClick={share}>Share</button>
        </div>
      </div>
    </>
  );
}

// style={{width:"35px", height:"44px" }}
