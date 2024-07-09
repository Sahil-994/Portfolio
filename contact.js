// Get the form element
const form = document.getElementById('contact-form');

// Add event listener to the form's submit event
form.addEventListener('submit', validateForm);

// Function to validate the form
function validateForm(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the input fields
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Check if all required fields are filled out
  if (name.value === '' || email.value === '' || subject.value === '' || message.value === '') {
    document.getElementById('form-error').innerHTML = 'Please fill out all required fields.';
    return;
  }

  // Check if email is valid
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById('form-error').innerHTML = 'Invalid email address.';
    return;
  }

  // If all validation passes, submit the form
  
  const formData = new FormData(form);
  fetch('/send-email', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('form-error').innerHTML = 'Email sent successfully!';
    } else {
      document.getElementById('form-error').innerHTML = 'Error sending email.';
    }
  })
  .catch(error => console.error(error));
}
