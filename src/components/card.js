function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function handleLikeClick(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

function createCard(card, deleteCard, handleLikeClick, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newTemplate = cardTemplate.cloneNode(true);

  const cardImg = newTemplate.querySelector(".card__image");
  cardImg.src = card.link;
  cardImg.alt = `Качественное фото города ${card.name}`;
  cardImg.addEventListener("click", handleImageClick);

  const cardTitle = newTemplate.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = newTemplate.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const likeButton = newTemplate.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeClick);

  return newTemplate;
}

export { createCard, deleteCard, handleLikeClick };
