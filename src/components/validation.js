function validateInput(inputElement, settings) {
  inputElement.setCustomValidity("");
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
      inputElement.setCustomValidity(inputElement.validationMessage);
    }
    displayError(inputElement, settings);
  } else {
    clearError(inputElement, settings);
  }
}

function displayError(inputElement, settings) {
  const errorElement = document.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
}

function clearError(inputElement, settings) {
  const errorElement = document.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
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
    clearError(inputElement, settings);
  });

  toggleSubmitButton(formElement, settings);
}

export { enableValidation, clearValidation };
