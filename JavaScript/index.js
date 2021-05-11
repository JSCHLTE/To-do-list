//Jordan Schulte
//Query Selectors
const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const trashBtn = document.querySelector('.trash-btn')
const todoList = document.querySelector('.todo-list');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', createTodo);
todoList.addEventListener('click', checkTodo);
//Functions
function createTodo(event){
    event.preventDefault();
    if(userInput.value == ''){
        alert(`To-do cannot be blank.`);
        return;
    }
    //DIV
    const newDiv = document.createElement('div');
    newDiv.className = 'todo';
    todoList.appendChild(newDiv);
    //LI
    const newLi = document.createElement('li');
    newLi.innerHTML = userInput.value;
    saveLocalTodos(userInput.value);
    newDiv.appendChild(newLi);
    //BUTTON
    const newBtn = document.createElement('button');
    newBtn.className = 'trash-btn';
    newLi.appendChild(newBtn);
    newBtn.innerHTML = '<i class="fas fa-trash"></i>';
    userInput.value = '';
    userInput.focus();
}
function checkTodo(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const liParent = item.parentElement;
        const todo = liParent.parentElement;
        todo.remove();
        deleteTodo(todo);
    }
    if(item.classList[0] === 'todo' || 'li'){
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
        newLi.innerHTML = todo;
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
};

