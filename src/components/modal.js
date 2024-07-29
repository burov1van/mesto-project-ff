function openPopup(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 10);

  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("click", handleOverlayClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 600);

  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("click", handleOverlayClose);
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClose(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

export { openPopup, closePopup };
