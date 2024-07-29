import "./vendor/normalize.css";
import "./vendor/fonts.css";
import "./blocks/index.css";
import initialCards from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, handleLikeClick } from "./components/card";

// Инициализация глобальных констант и переменных
const cardContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');

// Находим форму и поля ввода в DOM для редактирования профиля
const formEditProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Находим элементы, которые будем обновлять
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму и поля ввода в DOM для добавления новой карточки
const formNewCard = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

// Функция обработки кликов по изображению
function handleImageClick(event) {
  const cardImage = event.target;
  popupImageElement.src = cardImage.src;
  popupImageElement.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(popupImage);
}

// Вывод начальных карточек на страницу
initialCards.forEach((cardData) => {
  const cardAdd = createCard(cardData, deleteCard, handleLikeClick, handleImageClick);
  cardContainer.append(cardAdd);
});

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// Открытие попапа добавления новой карточки
addProfileButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});

// Закрытие попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Обработчик отправки формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value }, deleteCard, handleLikeClick, handleImageClick);
  cardContainer.prepend(newCard);
  formNewCard.reset();
  closePopup(popupTypeNewCard);
}

// Прикрепляем обработчики к формам
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formNewCard.addEventListener('submit', handleFormNewCardSubmit);
