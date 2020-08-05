class SearchForm {
  constructor(domElements, submitFormCallback, ERROR_MESSAGES) {
    this._form = domElements.form;
    this._input = domElements.input;
    this._inputError = domElements.inputError;
    this._submitButton = domElements.submitButton;
    this._submitFormCallback = submitFormCallback;
    this._ERROR_MESSAGES = ERROR_MESSAGES;

    this.boundEnableFormElements = this._enableFormElements.bind(this);
    this.boundDisableFormElements = this._disableFormElements.bind(this);
    this.boundResetForm = this._resetForm.bind(this);
  }

  _isFormValid() {
    return this._form.checkValidity();
  }

  _renderErrorElement(inputElement, errorElement) {
    const validityState = inputElement.validity;

    if (validityState.valueMissing) {
      errorElement.textContent = this._ERROR_MESSAGES.requiredField;

      return;
    }

    errorElement.textContent = '';
  }

  _enableFormElements() {
    this._form.elements.forEach((element) => {
      element.removeAttribute('disabled');
      element.style['pointer-events'] = 'auto';
    });
  }

  _disableFormElements() {
    this._form.elements.forEach((element) => {
      element.setAttribute('disabled', true);
      element.style['pointer-events'] = 'none';
    });
  }

  _resetForm() {
    this._inputError.textContent = '';
    this._form.reset();
  }

  _submitHandler(event) {
    event.preventDefault();
    this._renderErrorElement(this._input, this._inputError);

    if (!this._isFormValid()) {
      return;
    }

    const query = this._input.value;

    this._submitFormCallback(
      query,
      {
        enableFormElements: () => {
          this.boundEnableFormElements();
        },
        disableFormElements: () => {
          this.boundDisableFormElements();
        },
        resetForm: () => {
          this.boundResetForm();
        },
      },
    );
  }

  setEvenListeners() {
    this._boundSubmitHandler = this._submitHandler.bind(this);

    this._form.addEventListener('submit', this._boundSubmitHandler);
  }
}

export default SearchForm;
