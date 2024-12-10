document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);

function getFormFields() {
    return [
        {element: document.getElementById('username'), validations: [validateRequired, validateUsernameLength]},
        {element: document.getElementById('email'), validations: [validateRequired, validateEmail]},
        {element: document.getElementById('password'), validations: [validateRequired, validatePassword]},
        {
            element: document.getElementById('confirmPassword'),
            validations: [validateRequired, validateConfirmPassword.bind(null, document.getElementById('password'))]
        },
    ];
}

function handleFormSubmit(event) {
    event.preventDefault();
    const fields = getFormFields();
    clearValidationStates(fields);

    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field.element, field.validations)) {
            isValid = false;
        }
    });

    if (isValid) {
        event.target.submit();
    }
}


function validateField(element, validations) {
    for (let validate of validations) {
        let errorMessage = validate(element);
        if (errorMessage) {
            setError(element, errorMessage);
            return false;
        }
    }
    setValid(element);
    return true;
}

function validateRequired(element) {
    if (element.value.trim() === '') {
        const label = document.querySelector(`label[for="${element.id}"]`);
        const labelText = label ? label.textContent : 'This field';
        return `${labelText} is required.`;
    }
    return null;
}

function validateUsernameLength(element) {
    let length = element.value.length;
    if (length < 4 || length > 32) {
        return 'Username must be 4-32 characters long.';
    }
    return null;
}

function validateEmail(element) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(element.value)) {
        return 'Please enter a valid email.';
    }
    return null;
}

function validatePassword(element) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,64}$/;
    if (!passwordPattern.test(element.value)) {
        return 'Password must be 6-64 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
    }
    return null;
}

function validateConfirmPassword(confirmPasswordElement, passwordElement) {
    if (confirmPasswordElement.value !== passwordElement.value) {
        return 'Passwords do not match.';
    }
    return null;
}

function setError(element, message) {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.textContent = message;
    element.style.borderWidth = '3px';
}

function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
    element.style.borderWidth = '3px';
}

function clearValidationStates(fields) {
    fields.forEach(field => {
        field.element.classList.remove('is-invalid', 'is-valid');
        field.element.style.borderWidth = '1px';
        field.element.nextElementSibling.textContent = '';
    });
}
