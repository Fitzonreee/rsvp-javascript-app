
const form = document.getElementById('registrar');
const input = form.querySelector('input');
// Get ul where names will be stored as li's (Global scope for ultimate access)
const ul = document.getElementById('invitedList');


// Add check to lower RGBA value before appending next li
function createListItem(text) {
  // Create li to append to ul
  const li = document.createElement('li');
  // Create and populate p with content from input field (name) and insert in li
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);
  // Add a 'Confirmed' checkbox inside an input element to the li
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);
  // Add edit button to change name
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  li.appendChild(editButton);
  // Add a Remove button to each li as it is created - just like checkbox
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  li.appendChild(removeButton);
  // Append li inside ul - this is breaking the current createListItem function
  if (text != '') {
    ul.appendChild(li);
  } else {
    console.log('Please enter a name before submitting.');
  }
  return li;
}

form.addEventListener('submit', (e) => {
  // Prevent page from refreshing when hitting submit button
  e.preventDefault();
  // Store text input (name)
  const text = input.value;
  // FUNCTION THAT APPENDS INPUT VALUE TO NEW li
  const li = createListItem(text);
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
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'Remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'Edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'Save';
    }
  }
});
