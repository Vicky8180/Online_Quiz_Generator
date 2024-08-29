const GlowAndShakeEffect = (element) => {
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

      @keyframes glowFade {
        0% { box-shadow: 0 0 15px 10px red; }
        100% { box-shadow: 0 0 15px 0px rgba(144, 238, 144, 0); }
      }

      .shake-glow {
        animation: shake 0.5s, glowFade 1s ease-out;
      }
    `;
    document.head.appendChild(style);

    element.classList.add("shake-glow");

    setTimeout(() => {
      element.classList.remove("shake-glow");
      document.head.removeChild(style);
    }, 1000);
  }
};

export default GlowAndShakeEffect;
