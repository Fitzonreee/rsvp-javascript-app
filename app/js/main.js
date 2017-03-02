document.addEventListener('DOMContentLoaded', () => {

  // RSVP JavaScript App
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const mainDiv = document.querySelector('.main');
  // Get ul where names will be stored as li's (Global scope for ultimate access)
  const ul = document.getElementById('invitedList');

  // Add div with checkbox to toggle invitees that haven't responded
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  filterLabel.textContent = "See who is coming";
  filterCheckBox.type = 'checkbox';
  div.className = "toggleResponses";
  div.appendChild(filterCheckBox);
  div.appendChild(filterLabel);
  mainDiv.insertBefore(div, ul);

  // Add eventListener to checkbox to toggle responses
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });

  // Testing
  function getCount() {
    const ul = document.getElementById('invitedList');
    const menu = document.querySelector('.toggleResponses');
    const span = document.createElement('span');

    let el = ul.firstElementChild
    let count = ul.children.length;

    if (el = "li") {
      console.log('This is an li');
      span.textContent = count;
      menu.appendChild(span);

    } else {
      menu.appendChild(span);
    }
  }

  // Add check to lower RGBA value before appending next li
  function createListItem(text) {

    // Create a function that creates Elements for you
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    // Create a function for appending elements to the UL
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    // Combination of above two function
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('input', 'type', 'checkbox');
    appendToLI('label', 'textContent', 'Confirmed');
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');

    // Append li inside ul if it isn't blank
    if (text != '') {
      ul.appendChild(li);
      getCount();
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
    // getCount();
  });

  // Add an eventListener so when checkbox is clicked a class of 'responded' is added
  ul.addEventListener('change', (e) => {
    // console.log(e.target.checked);
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode;
    // console.log(listItem);
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  // Click event that corresponds to remove/edit/save button
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      // select and run action in button's name
      nameActions[action]();
    }
  });
}); // end DOMContentLoaded

// TODO: Add From validation - alert user
// TODO: Prevent duplicate name
// TODO: Text nodes - have it say 'Confirm', once checked = "Confirmed"
// TODO: When you toggle confirmed guests, remove confirmed checkbox from li
// TODO: Use Local Storage to allow names to persist
