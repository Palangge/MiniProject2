const registerForm = document.getElementById('registration-form');
const registerToast = document.getElementById('registerToast');
const registerToastMsg = document.getElementById('registerToastMsg');
if(registerForm)
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const { firstName, lastName, email, password } = registerForm.elements;

  const errors = {};

  if (!firstName.value) errors.firstName = 'Please enter your first name';
  if (!lastName.value) errors.lastName = 'Please enter your last name';
  if (!email.value) errors.email = 'Please enter your email';
  if (!password.value) errors.password = 'Please enter your password';

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    return;
  }

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  };

  fetch('http://127.0.0.1:5000/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorText => { throw new Error(errorText); });
      }
      return response.text();
    })
    .then(data => {
      showToast('Registration successful!', 'toast-success');
      console.log(data);
      // Redirect to account.html
      window.location.href = 'account.html';
    })
    .catch(error => {
      showToast('Registration failed!', 'toast-error');
      console.error('There was a problem with the fetch operation:', error);
    });

  registerForm.reset();
});

const displayErrors = (errors) => {
  for (const field in errors) {
    const errorMessage = errors[field];
    const errorElement = document.getElementById(field + 'Error');
    errorElement.textContent = errorMessage;
  }
};

const showToast = (message, toastClass) => {
  registerToastMsg.textContent = message;
  registerToast.classList.add(toastClass);

  const toast = new bootstrap.Toast(registerToast);
  toast.show();

  registerToast.addEventListener('hidden.bs.toast', () => {
    registerToast.classList.remove(toastClass);
  });
};

// Login
const loginForm = document.getElementById('login-form');
const loginToast = document.getElementById('loginToast');
const loginToastMsg = document.getElementById('loginToastMsg');

if(loginForm)
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const { email, password } = loginForm.elements;

  const errors = {};

  if (!email.value) errors.email = 'Please enter your email';
  if (!password.value) errors.password = 'Please enter your password';

  if (Object.keys(errors).length > 0) {
    displayLoginErrors(errors);
    return;
  }

  const formData = {
    email: email.value,
    password: password.value
  };

  fetch('http://127.0.0.1:5000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorText => { throw new Error(errorText); });
      }
      return response.text();
    })
    .then(data => {
      showLoginToast('Login successful!', 'toast-success');
      console.log(data);
      // Redirect to index.html
      window.location.href = '../index.html';
    })
    .catch(error => {
      showLoginToast('Login failed!', 'toast-error');
      console.error('There was a problem with the fetch operation:', error);
    });

  loginForm.reset();
});

const displayLoginErrors = (errors) => {
  for (const field in errors) {
    const errorMessage = errors[field];
    const errorElement = document.getElementById(field + 'Error');
    errorElement.textContent = errorMessage;
  }
};

const showLoginToast = (message, toastClass) => {
  loginToastMsg.textContent = message;
  loginToast.classList.add('show', toastClass);

  setTimeout(() => {
    loginToast.classList.remove('show', toastClass);
  }, 3000);
};



// Toast to contact form
const contactForm = document.getElementById('contact-form');
const contactToast = document.getElementById('contactToast');
const contactToastMsg = document.getElementById('contactToastMsg');
if(contactForm)
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Perform form validation here if needed

  // Display "Message sent" toast
  showContactToast('Message sent!', 'toast-success');
  contactForm.reset();
});

const showContactToast = (message, toastClass) => {
  contactToastMsg.textContent = message;
  contactToast.classList.add('show', toastClass);

  setTimeout(() => {
    contactToast.classList.remove('show', toastClass);
  }, 3000);
};

// Toggle Menu Items
const MenuItems = document.getElementById("MenuItems")

if(MenuItems) {
MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
       {
        MenuItems.style.maxHeight = "200px";
       } 
    else
       {
        MenuItems.style.maxHeight = "0px";
       } 
}}