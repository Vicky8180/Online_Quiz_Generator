import "./Toast.css";
import redCrossIcon from "../../assets/Icons/redCrossIcon.png";
import checkIcon from "../../assets/Icons/checkIcon.png";

function showToast(message, checker) {
  // const [changer, setChanger]=useState(100);

  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  const img = document.createElement("img");
  img.style.width = "25px";
  img.style.height = "25px";
  const textDiv = document.createElement("span");
  textDiv.innerText = message;

  let mover = document.createElement("div");
  mover.className = checker ? "mover" : "mover_error";

  let changer = 98;
  img.src = checker ? checkIcon : redCrossIcon;
  toast.appendChild(img);
  toast.appendChild(textDiv);
  function moverFunction() {
    mover.style.width = `${changer}%`;

    if (changer > 0) {
      changer = changer - 1;
    } else {
      clearInterval(interval);
    }
  }

  const interval = setInterval(moverFunction, 30);

  toastContainer.appendChild(toast);
  toastContainer.appendChild(mover);

  setTimeout(() => {
    toast.classList.add("show");
    mover.classList.add("mover2");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    mover.classList.remove("mover2");
    setTimeout(() => {
      toast.remove();
      mover.remove();
    }, 10);
  }, 3000);
}

export default showToast;
