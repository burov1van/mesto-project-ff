// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const newTemplate = cardTemplate.cloneNode(true);

  const cardImg = newTemplate.querySelector(".card__image");
  cardImg.src = card.link;
  cardImg.alt = `Качественное фото города ${card.name}`;

  const cardTitle = newTemplate.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = newTemplate.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return newTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
  const cardAdd = createCard(cardData, deleteCard);
  cardContainer.append(cardAdd);
});
