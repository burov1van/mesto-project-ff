import { openPopup, closePopup } from "./modal"; // Импортируем функции из файла modal.js

// Функция для удаления карточки с сервера
function deleteCardFromServer(cardId, cardElement) {
  const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
    headers: {
      authorization: '72ad478c-52e8-4a52-86e7-e878c04e7c49',
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then((res) => {
    if (res.ok) {
      cardElement.remove();  // Удаляем карточку с интерфейса, если запрос успешен
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .catch((err) => {
    console.error(err);  // Обработка ошибки
  });
}

function deleteCard(event) {
  const cardElement = event.target.closest(".card");
  const cardId = cardElement.dataset.cardId; // Получаем ID карточки

  // Открываем попап подтверждения удаления
  openPopup(document.querySelector('.popup_type_delete-card'));

  // Удаляем предыдущие обработчики события, чтобы не дублировались
  const confirmButton = document.querySelector('.popup__confirm');
  confirmButton.replaceWith(confirmButton.cloneNode(true));

  // Новый обработчик нажатия "Да" в попапе удаления
  document.querySelector('.popup__confirm').addEventListener('click', () => {
    deleteCardFromServer(cardId, cardElement); // Удаляем карточку с сервера и из интерфейса
    closePopup(document.querySelector('.popup_type_delete-card'));
  });
}

// Обновляем функцию обработки кликов по кнопке лайка
function handleLikeClick(event) {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");
  const cardId = cardElement.dataset.cardId; // Получаем ID карточки
  const likeCountElement = cardElement.querySelector(".card__like-count");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    // Если лайк активен, то снимаем лайк
    dislikeCardOnServer(cardId).then((updatedCard) => {
      likeButton.classList.remove("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
    });
  } else {
    // Если лайк не активен, то ставим лайк
    likeCardOnServer(cardId).then((updatedCard) => {
      likeButton.classList.add("card__like-button_is-active");
      likeCountElement.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
    });
  }
}


// Добавляем функцию для постановки лайка на сервере
function likeCardOnServer(cardId) {
  const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
    headers: {
      authorization: '72ad478c-52e8-4a52-86e7-e878c04e7c49',
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json(); // Возвращаем обновленные данные карточки
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.error(err);  // Обработка ошибки
  });
}

// Добавляем функцию для снятия лайка с сервера
function dislikeCardOnServer(cardId) {
  const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
    headers: {
      authorization: '72ad478c-52e8-4a52-86e7-e878c04e7c49',
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json(); // Возвращаем обновленные данные карточки
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.error(err);  // Обработка ошибки
  });
}


function createCard(card, deleteCard, handleLikeClick, handleImageClick, userId) {
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

  cardElement.dataset.cardId = card._id; // Сохраняем ID карточки

  // Обновляем счетчик лайков
  likeCountElement.textContent = card.likes.length;

  // Проверяем, лайкнул ли текущий пользователь карточку, и устанавливаем класс активности
  const likeButton = newTemplate.querySelector(".card__like-button");
  if (card.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", handleLikeClick);

  // Показываем иконку удаления только если карточка создана текущим пользователем
  if (card.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", deleteCard);
  }

  return newTemplate;
}


export { createCard, deleteCard, handleLikeClick };
