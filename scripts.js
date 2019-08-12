// вынести повторяющийся код из рендера в функцию, перерендерить только тудуконтейнер, переделать в класс  

let todos = [];
let nextId = 1;
let currentViewMode = 'All';

function createElement(tag) {
  return document.createElement(`${tag.toUpperCase()}`);
}

function updateItemsLeft(todosArr) {
  let left = 0;
  todosArr.forEach((todo) => {
    if (!todo.isCompleted) {
      left += 1;
    }
  });
  if (left === 1) {
    document.querySelector('.quantity').innerText = `${left} item left`;
  } else {
    document.querySelector('.quantity').innerText = `${left} items left`;
  }
}

function addSrc(obj, index, node) {
  const newObj = Object.assign({}, obj);
  newObj.src = node;
  todos[index] = newObj;
}

function addEventListeners() {
  document.querySelector('.input-field').addEventListener('keyup', addTodo);

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', toggleReadyState);
  });

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeTodo);
  });

  const filterAllButton = document.querySelector('.filter-button-all');
  filterAllButton.addEventListener('click', () => {
    currentViewMode = 'All';
    renderTodos(todos, currentViewMode);
  });

  const filterActiveButton = document.querySelector('.filter-button-active');
  filterActiveButton.addEventListener('click', () => {
    currentViewMode = 'Active';
    renderTodos(todos, currentViewMode);
  });

  const filterCompletedButton = document.querySelector('.filter-button-completed');
  filterCompletedButton.addEventListener('click', () => {
    currentViewMode = 'Completed';
    renderTodos(todos, currentViewMode);
  });

  document.querySelector('.clear-completed-button').addEventListener('click', clearCompleted);
}

function renderTodos(todosArr, viewMode) {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  const mainContainer = createElement('section');
  mainContainer.classList.add('main-container');
  const inputField = createElement('input');
  inputField.classList.add('input-field');
  const todosContainer = createElement('div');
  todosContainer.classList.add('todos-container');
  const todoList = createElement('ul');
  todoList.classList.add('todo-list');
  if (viewMode === 'All') {
    todosArr.forEach((todo, index) => {
      const todoItem = createElement('li');
      const connector = createElement('div');
      connector.classList.add('connector');
      todoItem.classList.add('todo-item');
      const checkbox = createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `checkbox_${todo.id}`;
      checkbox.checked = todo.isCompleted;
      checkbox.classList.add('checkbox');

      const checkboxLabel = createElement('label');
      checkboxLabel.htmlFor = `checkbox_${todo.id}`;
      const todoTitle = createElement('span');
      if (todo.isCompleted) {
        todoTitle.classList.add('completed');
      }
      todoTitle.innerHTML = todo.title;
      checkboxLabel.append(todoTitle);

      const removeButton = createElement('button');
      removeButton.innerHTML = '&times';
      removeButton.classList.add('remove-button');
      removeButton.type = 'button';
      connector.append(checkbox, checkboxLabel);
      todoItem.append(connector, removeButton);

      todoList.append(todoItem);
      addSrc(todo, index, todoItem);
    });
  } else if (viewMode === 'Active') {
    todos.forEach((todo, index) => {
      if (!todo.isCompleted) {
        const todoItem = createElement('li');
        const connector = createElement('div');
        connector.classList.add('connector');
        todoItem.classList.add('todo-item');
        const checkbox = createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox_${todo.id}`;
        checkbox.checked = todo.isCompleted;
        checkbox.classList.add('checkbox');

        const checkboxLabel = createElement('label');
        checkboxLabel.htmlFor = `checkbox_${todo.id}`;
        const todoTitle = createElement('span');
        todoTitle.innerHTML = todo.title;
        checkboxLabel.append(todoTitle);

        const removeButton = createElement('button');
        removeButton.innerHTML = '&times';
        removeButton.classList.add('remove-button');
        removeButton.type = 'button';
        connector.append(checkbox, checkboxLabel);
        todoItem.append(connector, removeButton);

        todoList.append(todoItem);
        addSrc(todo, index, todoItem);
      }
    });
  } else {
    todos.forEach((todo, index) => {
      if (todo.isCompleted) {
        const todoItem = createElement('li');
        const connector = createElement('div');
        connector.classList.add('connector');
        todoItem.classList.add('todo-item');
        const checkbox = createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox_${todo.id}`;
        checkbox.checked = todo.isCompleted;
        checkbox.classList.add('checkbox');

        const checkboxLabel = createElement('label');
        checkboxLabel.htmlFor = `checkbox_${todo.id}`;
        const todoTitle = createElement('span');
        todoTitle.innerHTML = todo.title;
        checkboxLabel.append(todoTitle);

        const removeButton = createElement('button');
        removeButton.innerHTML = '&times';
        removeButton.classList.add('remove-button');
        removeButton.type = 'button';
        connector.append(checkbox, checkboxLabel);
        todoItem.append(connector, removeButton);

        todoList.append(todoItem);
        addSrc(todo, index, todoItem);
      }
    });
  }
  todosContainer.append(todoList);

  const bottomPanel = createElement('div');
  bottomPanel.classList.add('botom-panel');

  const itemsLeft = createElement('span');
  itemsLeft.classList.add('quantity');

  const buttonsContainer = createElement('div');
  buttonsContainer.classList.add('filter-buttons-container');
  const showAllButton = createElement('button');
  showAllButton.type = 'button';
  showAllButton.classList.add('filter-button-all');
  showAllButton.innerText = 'All';
  const showActiveButton = createElement('button');
  showActiveButton.type = 'button';
  showActiveButton.classList.add('filter-button-active');
  showActiveButton.innerText = 'Active';
  const showCompletedButton = createElement('button');
  showCompletedButton.type = 'button';
  showCompletedButton.classList.add('filter-button-completed');
  showCompletedButton.innerText = 'Completed';
  buttonsContainer.append(showAllButton, showActiveButton, showCompletedButton);

  const clearCompletedButton = createElement('button');
  clearCompletedButton.type = 'button';
  clearCompletedButton.classList.add('clear-completed-button');
  clearCompletedButton.innerText = 'Clear Completed';
  bottomPanel.append(itemsLeft, buttonsContainer, clearCompletedButton);

  mainContainer.append(inputField, todosContainer, bottomPanel);
  document.body.append(mainContainer);
  addEventListeners();
  updateItemsLeft(todos);
}

function addTodo(event) {
  if (event.key === 'Enter') {
    todos.push({
      title: event.target.value,
      isCompleted: false,
      id: nextId,
    });
    renderTodos(todos, currentViewMode);
    updateItemsLeft(todos);
    addEventListeners();
    nextId += 1;
  }
  document.querySelector('.input-field').focus();
}

function removeTodo(event) {
  const indexToDelete = todos.findIndex(todo => todo.src === event.target.parentNode);
  if ((indexToDelete + 1) === true) {
    todos.splice(indexToDelete, 1);
  }
  renderTodos(todos, currentViewMode);
  updateItemsLeft(todos);
  addEventListeners();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.isCompleted === true);
  renderTodos(todos, 'All');
  updateItemsLeft(todos);
  addEventListeners();
}


function toggleReadyState(event) {
  let isChoosenCompleted = false;
  const choosenIndex = todos.findIndex((todo) => {
    if (todo.src === event.target.closest('LI')) {
      isChoosenCompleted = todo.isCompleted;
      return true;
    }
    return false;
  });
  if (isChoosenCompleted) {
    todos[choosenIndex].isCompleted = false;
  } else {
    todos[choosenIndex].isCompleted = true;
  }
  renderTodos(todos, currentViewMode);
  updateItemsLeft(todos);
  addEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodos(todos, currentViewMode);
  updateItemsLeft(todos);
  addEventListeners();
});
