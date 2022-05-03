i=0
function changecolor(color)
{
    document.body.style.background = color
}
function changeimage()
{
    document.body.style.backgroundImage = "url(https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/thumbimg_25361957thumbejpg.jpg)"
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
}
function changefont(font)
{
    document.body.style.fontSize = font
}
const updateForm = document.querySelector('.update-form');
const updateInput = document.querySelector('.update-input');
const updateItemsList = document.querySelector('.update-items');
let updates = [];
updateForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addupdate(updateInput.value);
});
function addupdate(item) {
  if (item !== '') {
    const update = {
      id: Date.now(),
      name: item,
      completed: false
    };

    updates.push(update);
    addToLocalStorage(updates); 
    updateInput.value = '';
  }
}
function renderupdates(updates) {
  updateItemsList.innerHTML = '';
  updates.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    i = i+1;
    li.innerHTML = `
      ${item.name} 
           <button class="delete-button">X</button>
    `;
    updateItemsList.append(li);
  });
}
function addToLocalStorage(updates) {
  localStorage.setItem('updates', JSON.stringify(updates));
  renderupdates(updates);
}
function getFromLocalStorage() {
  const reference = localStorage.getItem('updates');
  if (reference) {
    updates = JSON.parse(reference);
    renderupdates(updates);
  }
}
function toggle(id) {
  updates.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
addToLocalStorage(updates);
}
function deleteupdate(id) {
  updates = updates.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(updates);
}

getFromLocalStorage();

updateItemsList.addEventListener('click', function(event) {

  if (event.target.classList.contains('delete-button')) {
    deleteupdate(event.target.parentElement.getAttribute('data-key'));
  }
});
