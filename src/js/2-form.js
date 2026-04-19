let formData = {
  email: '',
  message: '',
};

const localStorageKey = 'feedback-form-state';

const localStorageFormData = checkLocalStorage();

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input');
const messageTextArea = form.querySelector('textarea');

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', handleInput);

emailInput.value = localStorageFormData.email;
messageTextArea.value = localStorageFormData.message;

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  formData.email = '';
  formData.message = '';
  localStorage.removeItem(localStorageKey);
  form.reset();
}

function handleInput(event) {
  const { name, value } = event.target;
  event.target.value = value.trim();
  writeTolocalStorage(name, value.trim());
}

function checkLocalStorage() {
  const localformData = JSON.parse(localStorage.getItem(localStorageKey));
  if (localformData !== null) {
    formData = { ...localformData };
    return localformData;
  } else {
    return { email: '', message: '' };
  }
}

function writeTolocalStorage(key, value) {
  formData[key] = value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}
