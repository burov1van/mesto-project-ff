import "./vendor/normalize.css";
import "./vendor/fonts.css";
import "./blocks/index.css";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, handleLikeClick } from "./components/card";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
} from "./components/api";

// Инициализация глобальных констант и переменных
const cardContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll(".popup__close");
const avatarEditButton = document.querySelector(".profile__edit-avatar-button");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = document.querySelector(".popup_type_avatar .popup__form");
const avatarLinkInput = document.querySelector(
  ".popup__input_type_avatar-link"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let userId; // Переменная для хранения ID текущего пользователя

function renderLoading(
  isLoading,
  submitButton,
  defaultText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = defaultText;
  }
}

// Обработчик отправки формы обновления аватара
formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newAvatarLink = avatarLinkInput.value;
  const submitButton = formAvatar.querySelector(".popup__button");

  renderLoading(true, submitButton);

  updateAvatar(newAvatarLink)
    .then((data) => {
      document.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url(${data.avatar})`;
      formAvatar.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Загружаем информацию о пользователе и карточки одновременно
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector(
      ".profile__image"
    ).style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        deleteCard,
        handleLikeClick,
        handleImageClick,
        userId
      );
      cardContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Находим форму и поля ввода в DOM для редактирования профиля
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Находим форму и поля ввода в DOM для добавления новой карточки
const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Функция обработки кликов по изображению
function handleImageClick(event) {
  const cardImage = event.target;
  popupImageElement.src = cardImage.src;
  popupImageElement.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(popupImage);
}

// Открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// Открытие попапа добавления новой карточки
addProfileButton.addEventListener("click", () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openPopup(popupTypeNewCard);
});

// Закрытие попапов
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Обработчик отправки формы редактирования профиля
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;
  const submitButton = formEditProfile.querySelector(".popup__button");

  renderLoading(true, submitButton);

  updateProfile(newName, newJob)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Обработчик отправки формы добавления новой карточки
formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardLink = cardLinkInput.value;
  const submitButton = formNewCard.querySelector(".popup__button");

  renderLoading(true, submitButton);

  addNewCard(newCardName, newCardLink)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        deleteCard,
        handleLikeClick,
        handleImageClick,
        userId
      );
      cardContainer.prepend(cardElement);
      formNewCard.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

// Настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
enableValidation(validationConfig);
