import { openPopup, closePopup } from "./modal";
import {
  deleteCardFromServer,
  likeCardOnServer,
  dislikeCardOnServer,
} from "./api";

function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  const cardId = cardElement.dataset.cardId;

  openPopup(document.querySelector(".popup_type_delete-card"));

  const confirmButton = document.querySelector(".popup__confirm");

  confirmButton.removeEventListener("click", handleDelete);

  confirmButton.addEventListener("click", handleDelete);

  function handleDelete() {
    deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
        closePopup(document.querySelector(".popup_type_delete-card"));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        confirmButton.removeEventListener("click", handleDelete);
      });
  }
}

// Обработка кликов по кнопке лайка
function handleLikeClick(event) {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");
  const cardId = cardElement.dataset.cardId;
  const likeCountElement = cardElement.querySelector(".card__like-count");

  // Выбираем метод в зависимости от текущего состояния лайка
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? dislikeCardOnServer
    : likeCardOnServer;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Создание карточки
function createCard(
  card,
  deleteCard,
  handleLikeClick,
  handleImageClick,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newTemplate = cardTemplate.cloneNode(true);

  const cardElement = newTemplate.querySelector(".card");
  const cardImg = newTemplate.querySelector(".card__image");
  const deleteButton = newTemplate.querySelector(".card__delete-button");
  const likeCountElement = newTemplate.querySelector(".card__like-count");

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardImg.addEventListener("click", handleImageClick);

  const cardTitle = newTemplate.querySelector(".card__title");
  cardTitle.textContent = card.name;

  cardElement.dataset.cardId = card._id;

  likeCountElement.textContent = card.likes.length;

  const likeButton = newTemplate.querySelector(".card__like-button");
  if (card.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", handleLikeClick);

  if (card.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", deleteCard);
  }

  return newTemplate;
}

export { createCard, deleteCard, handleLikeClick };
