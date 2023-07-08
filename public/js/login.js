// Login handling function
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the main page/default route
      document.location.replace('/');
    } else {
      // error would be because email/password already in use or are simply invalid, hence the alert
      alert('Invalid inputs, please try again!');
    }
  } else {
    // error would be because no email and/or password were entered
    alert('Please fill in empty fields!');
  }
};

// Function for signing up
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      // error would be because email/password already in use or are simply invalid, hence the alert
      alert('Invalid inputs, please try again!');
    }
  } else {
    // error would be because no email and/or password were entered
    alert('Please fill in empty fields!');
  }
};

// Event listeners
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
