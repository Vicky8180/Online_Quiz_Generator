const GlowEffect = (element) => {
  if (element) {
    const styleId = "permanent-glow-effect-style";
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.type = "text/css";
      style.innerHTML = `
        @keyframes glowPulse {
          0% { box-shadow: 0 0 4px 4px rgba(144, 238, 144, 1); }
          50% { box-shadow: 0 0 4px 4px rgba(144, 238, 144, 0.7); }
          100% { box-shadow: 0 0 4px 4px rgba(144, 238, 144, 1); }
        }
        .permanent-glow {
          color: #fff;
          background: #333;
          box-shadow: 0 0 4px 4px rgba(144, 238, 144, 1);
          animation: glowPulse 60s infinite ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }

    element.classList.add("permanent-glow");
  }
};

export default GlowEffect;
