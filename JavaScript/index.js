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
const notiWrapper = document.querySelector('.noti-wrapper');
const overlay = document.querySelector('.overlay');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', createTodo);
todoList.addEventListener('click', checkTodo);
clearBtn.addEventListener('click', promptWarning);
promptYes.addEventListener('click', clearTodo);
promptNo.addEventListener('click', promptWarning)
//Functions
function createTodo(event){
    event.preventDefault();
    if(userInput.value == ''){
        alert(`To-do cannot be blank.`);
        return;
    }
    if(userInput.value.length > 150){
        alert(`You cannot type more than 150 characters, you typed: ${userInput.value.length}.`);
        return;
    }
    //DIV
    const newDiv = document.createElement('div');
    newDiv.className = 'todo';
    todoList.appendChild(newDiv);
    //LI
    const newLi = document.createElement('li');
    newLi.innerText = userInput.value;
    saveLocalTodos(userInput.value);
    newDiv.appendChild(newLi);
    //BUTTON
    const newBtn = document.createElement('button');
    newBtn.className = 'trash-btn';
    newLi.appendChild(newBtn);
    newBtn.innerHTML = '<i class="fas fa-trash"></i>';
    userInput.value = '';
    userInput.focus();
    newNoti("<p>To-do <span class='green-color'>created</span>.</p>");
}
function checkTodo(e){
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
        item.classList.toggle('todo-checked');
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
    todos.forEach(function(todo){
        const newDiv = document.createElement('div');
        newDiv.className = 'todo';
        todoList.appendChild(newDiv);
        //LI
        const newLi = document.createElement('li');
        newLi.innerText = todo;
        newDiv.appendChild(newLi);
        //BUTTON
        const newBtn = document.createElement('button');
        newBtn.className = 'trash-btn';
        newLi.appendChild(newBtn);
        newBtn.innerHTML = '<i class="fas fa-trash"></i>';
    });
}
function deleteTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    newNoti("<p>To-do <span class='red-color'>deleted</span>.</p>");
};

function promptWarning(e) {
    e.preventDefault();
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
}

function clearTodo(e) {
    e.preventDefault();
    localStorage.clear();
    todoList.innerHTML = "";
    prompt.classList.toggle('showPrompt');
    overlay.classList.toggle('showPrompt');
    newNoti("<p>All To-do's have been <span class='red-color'>deleted</span>.</p>");
}

function newNoti(msg) {
    const newN = document.createElement('div');
    newN.classList.add("noti-wrapper");
    newN.classList.add("noti-animate");
    newN.innerHTML = msg;
    document.body.appendChild(newN);
    setTimeout(() => {
        newN.remove();
    }, 4000)
}

