
const form = document.getElementById('registrar');
const input = form.querySelector('input');
// Get ul where names will be stored as li's (Global scope for ultimate access)
const ul = document.getElementById('invitedList');

form.addEventListener('submit', (e) => {

  // Prevent page from refreshing when hitting submit button
  e.preventDefault();

  // Store text input (name)
  const text = input.value;

  // Create li to append to ul
  const li = document.createElement('li');
  // Create and populate p with content from input field (name) and insert in li
  const p = document.createElement('p');
  p.textContent = text;
  li.appendChild(p);

  // Add a 'Confirmed' checkbox inside an input element to the li
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);

  // Add a Remove button to each li as it is created - just like checkbox
  const button = document.createElement('button');
  button.textContent = 'Remove';
  li.appendChild(button);

  // Append li inside ul
  if (text != '') {
    ul.appendChild(li);
  } else {
    console.log('Please enter a name before submitting.');
  }
  // Remove name from input after submitting
  input.value = '';
});

// Add an eventListener so when checkbox is clicked a class of 'responded' is added
ul.addEventListener('change', (e) => {
  // console.log(e.target.checked);
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  // console.log(listItem);

  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

// Click event that corresponds to 'Remove' button
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});
