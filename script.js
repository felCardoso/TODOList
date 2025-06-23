// Element Selection //
const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');

// Functions //
const createTaskElement = (taskText, isDone = false) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (isDone) {
        taskItem.classList.add('done');
    }

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-btn';

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert("Please, type a task!");
        return;
    }

    createTaskElement(taskText);
    taskInput.value = '';
    taskInput.focus();

    saveTasks();
}

const handleTaskClick = (event) => {
    const clickedElement = event.target;
    const taskItem = clickedElement.closest('.task-item');

    if (!taskItem) return;

    if (clickedElement.tagName === 'SPAN') {
        taskItem.classList.toggle('done');
    }

    if (clickedElement.classList.contains('delete-btn')) {
        taskItem.style.opacity = '0';
        setTimeout(() => {
            taskItem.remove();
            saveTasks();
        }, 300);
    }
    
    if (!clickedElement.classList.contains('delete-btn')) {
        saveTasks();
    }
}

const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        const text = taskItem.querySelector('span').textContent;
        const isDone = taskItem.classList.contains('done');
        tasks.push({ text, isDone });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.isDone);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskList.addEventListener('click', handleTaskClick);

taskInput.addEventListener("keydown", (enter = (event) => (event.key === "Enter" ? addTask() : null)));

document.addEventListener('DOMContentLoaded', loadTasks);
