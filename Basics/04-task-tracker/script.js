const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks when the page starts
loadTasks();

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTaskElement(input.value);
        saveTasks(); // Save after adding
        input.value = "";
    }
});

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span><button class="delete-btn">❌</button>`;
    
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks(); // Save after deleting
    });

    todoList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li span').forEach(span => tasks.push(span.innerText));
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('myTasks'));
    if (savedTasks) {
        savedTasks.forEach(taskText => createTaskElement(taskText));
    }
}