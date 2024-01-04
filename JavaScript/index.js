//Jordan Schulte

//Query Selectors

const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const trashBtn = document.querySelector('.trash-btn');
const clearBtn = document.getElementById('del-all');
const prompt = document.getElementById('prompt-warning');
const promptYes = document.getElementById('promptYes');
const promptNo = document.getElementById('promptNo');
const todoList = document.querySelector('.todo-list');
const overlay = document.querySelector('.overlay');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', handleSubmit);
todoList.addEventListener('click', checkTodo);
clearBtn.addEventListener('click', promptWarning);
promptYes.addEventListener('click', clearTodo);
promptNo.addEventListener('click', promptWarning)

//Functions

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
    }
    saveLocalTodos(obj)
    createTodo(obj)
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
        todo.remove();
        deleteTodo(todo);
        return;
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
    todos.forEach(todo => createTodo(todo))
}

function deleteTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let str = todo.children[0].innerText;
    str = str.slice(0, -1);
    todos.forEach(item => {
        if(str == item.value) {
            todos.splice(todos.indexOf(item), 1)
            console.log(todos)
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
};

function clearTodo(e) {
    e.preventDefault();
    localStorage.clear();
    todoList.innerHTML = "";
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
}

function promptWarning(e) {
    e.preventDefault();
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
}
