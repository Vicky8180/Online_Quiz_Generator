const DropInEffect = (element) => {
  if (element) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
        @keyframes dropIn {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .dropIn {
          animation: dropIn 0.5s ease-in;
        }
      `;
    document.head.appendChild(style);

    element.classList.add("dropIn");

    setTimeout(() => {
      element.classList.remove("dropIn");
      document.head.removeChild(style);
    }, 500);
  }
};

export default DropInEffect;
