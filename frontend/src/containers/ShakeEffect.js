const ShakeEffect = (element) => {
  if (element) {
    const style = document.createElement("style");
    style.type = "text/css";

    style.innerHTML = `
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }

        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
      .shake {
        animation: shake 0.5s;
      }
    `;
    document.head.appendChild(style);

    element.classList.add("shake");

    setTimeout(() => {
      element.classList.remove("shake");

      document.head.removeChild(style);
    }, 500);
  }
};

export default ShakeEffect;
