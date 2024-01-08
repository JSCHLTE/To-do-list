//Jordan Schulte

//Query Selectors

const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('del-all');
const prompt = document.getElementById('prompt-warning');
const promptYes = document.getElementById('promptYes');
const promptNo = document.getElementById('promptNo');
const taskCounter = document.getElementById('task-count');
const toggleTheme = document.getElementById('toggleTheme');
const trashBtn = document.querySelector('.trash-btn');
const todoList = document.querySelector('.todo-list');
const overlay = document.querySelector('.overlay');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', handleSubmit);
todoList.addEventListener('click', checkTodo);
clearBtn.addEventListener('click', promptWarning);
promptYes.addEventListener('click', clearTodo);
promptNo.addEventListener('click', promptWarning);
toggleTheme.addEventListener('click', changeTheme);
overlay.addEventListener('click', () => {
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
});

//Functions

function changeTheme() {
    document.body.classList.toggle('lightMode');
    if(document.body.classList.contains('lightMode')) {
        toggleTheme.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('lightMode', "true");
    } else {
        toggleTheme.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('lightMode', "false");
    }
}

function handleSubmit(e) {
    e.preventDefault();
    if(userInput.value == ''){
        alert(`To-do cannot be blank.`);
        return;
    }
    if(userInput.value.length > 150){
        alert(`You cannot type more than 150 characters, you typed: ${userInput.value.length}.`);
        return;
    }
    let obj = {
        value: userInput.value,
        id: todoList.children.length,
        class: ''
    };
    saveLocalTodos(obj);
    createTodo(obj);
}

function createTodo(info){
    //DIV
    const newDiv = document.createElement('div');
    newDiv.className = 'todo';
    if(info.class) {
        newDiv.classList.add('todo-checked');
    }
    todoList.appendChild(newDiv);
    //LI
    const newLi = document.createElement('li');
    newLi.innerText = info.value;
    newDiv.appendChild(newLi);
    //BUTTON
    const newBtn = document.createElement('button');
    newBtn.className = 'trash-btn';
    newLi.appendChild(newBtn);
    newBtn.innerHTML = '<i class="fas fa-times"></i>';
    userInput.value = '';
    userInput.focus();
    const newId = document.createElement('span');
    newId.className = "spanId"
    newId.innerText = info.id
    newLi.appendChild(newId)
    updateCounter()
}

function checkTodo(e){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const liParent = item.parentElement;
        const todo = liParent.parentElement;
        todo.classList.add('trash-animate');
        todo.addEventListener('transitionend', function(){
            todo.remove();
            deleteTodo(todo);
        });
    }
    if(item.classList[0] === 'todo'){
        const spanId = document.querySelector(".spanId");
        todos.forEach(todo => {
            if(item.children[0].children[1].innerText == todo.id) {
                if(!todo.class) {
                    todo.class = 'todo-checked'
                    item.classList.add('todo-checked');
                } else if(todo.class) {
                    todo.class = ''
                    item.classList.remove('todo-checked')
                }
            }
        })
        localStorage.setItem('todos', JSON.stringify(todos))
        updateCounter()
    }
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => createTodo(todo));
    updateCounter();
    if(localStorage.getItem('lightMode') == "true") {
        document.body.classList.add('lightMode');
        toggleTheme.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function deleteTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let todoSpanId = todo.children[0].children[1].innerText;
    todos.forEach(item => {
        if(item.id == todoSpanId) {
            todos.splice(todos.indexOf(item), 1)
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
    updateCounter()
};

function updateCounter() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todosClass = todos.filter(item => item.class == 'todo-checked');
    let todosCount = todos.length;
    if(!todosCount) {
        taskCounter.innerText = `Add some tasks!`;
    } else {
        taskCounter.innerText = `${todosClass.length}/${todosCount} tasks completed.`;
    }
}

function clearTodo(e) {
    e.preventDefault();
    localStorage.clear();
    todoList.innerHTML = "";
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
    updateCounter();
}

function promptWarning(e) {
    e.preventDefault();
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
}
