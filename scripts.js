let todos = []
let nextId = 1

document.addEventListener('DOMContentLoaded', () => {
    renderTodos(todos)
})
    
function createElement(tag) {
    return document.createElement(`${tag.toUpperCase()}`)
}

function addEventListeners() {
    document.querySelector('.input-field').addEventListener('keyup', addTodo)
    
    let checkboxes = document.querySelectorAll('.checkbox')
    for ( const checkbox of checkboxes) {
        checkbox.addEventListener('click', toggleReadyState)
    }
    
    let removeButtons = document.querySelectorAll('.remove-button')
    for (const button of removeButtons) {
        button.addEventListener('click', removeTodo)
    }
    
    let filterButtons = document.querySelectorAll('.filter-button')
    for (const button of filterButtons) {
        button.addEventListener('click', filterTodos)
    }
    
    document.querySelector('.clear-completed-button').addEventListener('click', clearCompleted)
}

function updateItemsLeft(todos) {
    let left = 0
    todos.forEach(todo => {
        if (!todo.isCompleted) {
            left++
        }
    })
    if (left === 1) {
        document.querySelector('.quantity').innerText = `${left}` + ' item left'
    } else {
        document.querySelector('.quantity').innerText = `${left}` + ' items left'
    }
}

function addTodo(event) {
    if (event.key === 'Enter') {
        todos.push({
            title: event.target.value,
            isCompleted: false,
            id: nextId
        })
        renderTodos(todos)
        nextId++
    }
    document.querySelector('.input-field').focus()
}

function removeTodo(event) { 
    console.log(`target id: ${event.target.id}`)
    let indexToDelete = todos.findIndex(todo => todo.id == event.target.id)
    console.log(indexToDelete)
    if (~indexToDelete) {
        todos.splice(indexToDelete, 1)
    }
    renderTodos(todos)
}

function toggleReadyState(event) {
    if (event.target.classList.contains('completed')) {
        let choosenIndex = todos.findIndex(todo => todo.id == event.target.nextSibling.nextSibling.id) //  через closest('button') не вышло
        todos[choosenIndex].isCompleted = false
        event.target.classList.remove('completed')
        console.log(`Toggled to uncompleted ${todos[choosenIndex].id}`)
    } else {
        let choosenIndex = todos.findIndex(todo => todo.id == event.target.nextSibling.nextSibling.id)
        todos[choosenIndex].isCompleted = true
        event.target.classList.add('completed')
        console.log(`Toggled to completed ${todos[choosenIndex].id}`)
        console.log(todos[event.target.nextSibling.nextSibling.id - 1])
    }
    renderTodos(todos)
}

function filterTodos(event) {
    let filteredTodos = [...todos]
    console.log(`before filtering: ${filteredTodos}`)
    switch(event.target.innerText){
        case 'Active':
            filteredTodos = todos.filter(todo => !todo.isCompleted)
            console.log(`after filtering: ${filteredTodos}`)
            break
        case 'Completed':
            filteredTodos = todos.filter(todo => todo.isCompleted)
            console.log(`after filtering: ${filteredTodos}`)
            break
        default:
            break
    }
    renderTodos(filteredTodos)
}
function clearCompleted() {
    console.log(`before clearing completed: ${todos}`)
    todos = todos.filter(todo => !todo.isCompleted === true)
    console.log(`after clearing completed: ${todos}`)
    renderTodos(todos)
}

function renderTodos(todos) {

    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }


    let mainContainer = createElement('section')
    mainContainer.classList.add('main-container')
    let inputField = createElement('input')
    inputField.classList.add('input-field')
    let todosContainer = createElement('div')
    todosContainer.classList.add('todos-container')
    let todoList = createElement('ul')
    todoList.classList.add('todo-list')
    todos = todos.map(todo => {
        const newTodo = Object.assign({}, todo)
        let todoItem = createElement('li')
        const connector = createElement('div')
        connector.classList.add('connector')
        todoItem.classList.add('todo-item')
        let checkbox = createElement('input')
        checkbox.type = 'checkbox'
        checkbox.value = todo.isCompleted
        checkbox.classList.add('checkbox')

        let todoTitle = createElement('span');
        todoTitle.classList.add('todo-title')
        todoTitle.innerHTML = todo.title

        let removeButton = createElement('button')
        removeButton.innerHTML = '&times'
        removeButton.classList.add('remove-button')
        removeButton.type = 'button'
        removeButton.id = todo.id
        connector.append(checkbox, todoTitle)
        todoItem.append(connector, removeButton)
        
        todoList.append(todoItem)
        newTodo.src = todoItem
        console.log(newTodo)
        return newTodo
    })
    todosContainer.append(todoList)

    let bottomPanel = createElement('div')
    bottomPanel.classList.add('botom-panel')

    let itemsLeft = createElement('span')
    itemsLeft.classList.add('quantity')

    let buttonsContainer = createElement('div')
    buttonsContainer.classList.add('filter-buttons-container')
    let showAllButton = createElement('button')
    showAllButton.type = 'button'
    showAllButton.classList.add('filter-button')
    showAllButton.innerText = 'All'
    let showActiveButton = createElement('button')
    showActiveButton.type = 'button'
    showActiveButton.classList.add('filter-button')
    showActiveButton.innerText = 'Active'
    let showCompletedButton = createElement('button')
    showCompletedButton.type = 'button'
    showCompletedButton.classList.add('filter-button')
    showCompletedButton.innerText = 'Completed'
    buttonsContainer.append(showAllButton, showActiveButton, showCompletedButton)

    let clearCompletedButton = createElement('button')
    clearCompletedButton.type = 'button'
    clearCompletedButton.classList.add('clear-completed-button')
    clearCompletedButton.innerText = 'Clear Completed'
    bottomPanel.append(itemsLeft, buttonsContainer, clearCompletedButton)

    mainContainer.append(inputField, todosContainer, bottomPanel)
    document.body.append(mainContainer)

    updateItemsLeft(todos)
    addEventListeners()
}
