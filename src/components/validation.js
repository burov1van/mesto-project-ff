const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const placeNameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

function validateInput(inputElement, settings) {
  const { customPatterns, errorMessages } = settings;

  if (inputElement.value.trim().length === 0) {
    inputElement.setCustomValidity(
      errorMessages.empty || "Вы пропустили это поле."
    );
  } else if (customPatterns && customPatterns[inputElement.name]) {
    const pattern = customPatterns[inputElement.name];
    if (!pattern.test(inputElement.value)) {
      inputElement.setCustomValidity(
        errorMessages[inputElement.name] ||
          "Введите корректное значение."
      );
    } else {
      inputElement.setCustomValidity("");
    }
  } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(
      errorMessages.url || "Введите корректную ссылку."
    );
  } else {
    inputElement.setCustomValidity("");
  }

  displayError(inputElement, settings);
}


function displayError(inputElement, settings) {
  const errorElement = document.querySelector(
    `.${inputElement.name}-input-error`
  );

  if (
    inputElement.classList.contains("input-interacted") &&
    inputElement.validationMessage
  ) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
  } else {
    errorElement.textContent = "";
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
  }
}

function toggleSubmitButton(formElement, settings) {
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  submitButton.disabled = !formElement.checkValidity();
  if (submitButton.disabled) {
    submitButton.classList.add(settings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(formElement, settings) {
  const inputElements = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      inputElement.classList.add("input-interacted");
      validateInput(inputElement, settings);
      toggleSubmitButton(formElement, settings);
    });

    inputElement.addEventListener("blur", () => {
      inputElement.classList.add("input-interacted");
      validateInput(inputElement, settings);
    });
  });

  toggleSubmitButton(formElement, settings);
}

function enableValidation(settings) {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formElements.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function clearValidation(formElement, settings) {
  const inputElements = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    inputElement.classList.remove("input-interacted");
    displayError(inputElement, settings);
  });

  toggleSubmitButton(formElement, settings);
}

export { enableValidation, clearValidation };
