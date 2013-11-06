'use strict';

var todos = [],
    stat = {},
    ENTER_KEY = 13;

window.addEventListener('load', windowLoadHandler, false);

function Todo(title, completed) {
    this.id = getUuid();
    this.title = title;
    this.completed = completed;
}

function windowLoadHandler() {
    refreshDisplay();
    addEventListeners();
}

function addEventListeners() {
    document.getElementById('new-todo').addEventListener('keypress', newTodoKeyPressHandler, false);
}

function inputEditTodoKeyPressHandler(event) {
    var inputEditTodo = event.target,
        trimmedText = inputEditTodo.value.trim(),
        todoId = event.target.id.slice(6);

    if (trimmedText) {
        if (event.keyCode === ENTER_KEY) {
            editTodo(todoId, trimmedText);
        }
    } else {
        removeTodoById(todoId);
        refreshDisplay();
    }
}

function inputEditTodoBlurHandler(event) {
    var inputEditTodo = event.target,
        todoId = event.target.id.slice(6);

    editTodo(todoId, inputEditTodo.value);
}

function newTodoKeyPressHandler(event) {
    console.log("key")
    if (event.keyCode === ENTER_KEY) {
        addTodo(document.getElementById('new-todo').value);
    }
}

function spanDeleteClickHandler(event) {
    removeTodoById(event.target.getAttribute('data-todo-id'));
    refreshData();
}


function hrefClearClickHandler() {
    removeTodosCompleted();
    refreshDisplay();
}

function todoContentHandler(event) {
    var todoId = event.target.getAttribute('data-todo-id'),
        div = document.getElementById('li_' + todoId),
        inputEditTodo = document.getElementById('input_' + todoId);

    div.className = 'editing';
    inputEditTodo.focus();
}

function checkboxChangeHandler(event) {
    var checkbox = event.target,
        todo = getTodoById(checkbox.getAttribute('data-todo-id'));

    todo.completed = checkbox.checked;
    refreshDisplay();
}


function addTodo(text) {
    var trimmedText = text.trim();

    if (trimmedText) {
        var todo = new Todo(trimmedText, false);
        todos.push(todo);
        refreshDisplay();
    }
}

function editTodo(todoId, text) {
    var i, l;

    for (i = 0, l = todos.length; i < l; i++) {
        if (todos[i].id === todoId) {
            todos[i].title = text;
        }
    }

    refreshDisplay();
}


function removeTodoById(id) {
    var i = todos.length;

    while (i--) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
        }
    }
}

function getTodoById(id) {
    var i, l;

    for (i = 0, l = todos.length; i < l; i++) {
        if (todos[i].id === id) {
            return todos[i];
        }
    }
}



function refreshDisplay() {

    var todo, checkbox, label, deleteLink, divDisplay, inputEditTodo, li, i, l,
        ul = document.getElementById('todo-list');

    ul.innerHTML = '';
    document.getElementById('new-todo').value = '';

    for (i = 0, l = todos.length; i < l; i++) {
        todo = todos[i];

        // create checkbox
        checkbox = document.createElement('input');
        checkbox.className = 'toggle';
        checkbox.setAttribute('data-todo-id', todo.id);
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', checkboxChangeHandler);

        // create div text
        label = document.createElement('label');
        label.setAttribute('data-todo-id', todo.id);
        label.appendChild(document.createTextNode(todo.title));
        label.addEventListener('dblclick', todoContentHandler);


        // create delete button
        deleteLink = document.createElement('button');
        deleteLink.className = 'destroy';
        deleteLink.setAttribute('data-todo-id', todo.id);
        deleteLink.addEventListener('click', spanDeleteClickHandler);

        // create divDisplay
        divDisplay = document.createElement('div');
        divDisplay.className = 'view';
        divDisplay.setAttribute('data-todo-id', todo.id);
        divDisplay.appendChild(checkbox);
        divDisplay.appendChild(label);
        divDisplay.appendChild(deleteLink);

        // create todo input
        inputEditTodo = document.createElement('input');
        inputEditTodo.id = 'input_' + todo.id;
        inputEditTodo.className = 'edit';
        inputEditTodo.value = todo.title;
        inputEditTodo.addEventListener('keypress', inputEditTodoKeyPressHandler);
        inputEditTodo.addEventListener('blur', inputEditTodoBlurHandler);


        // create li
        li = document.createElement('li');
        li.id = 'li_' + todo.id;
        li.appendChild(divDisplay);
        li.appendChild(inputEditTodo);


        if (todo.completed) {
            li.className += 'completed';
            checkbox.checked = true;
        }

        ul.appendChild(li);
    }
}

function getUuid() {
    var i, random,
        uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

