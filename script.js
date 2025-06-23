// Query Selectors //

const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");

// Functions //

const addTask = () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please, add a task!");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-btn";

  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);

  taskInput.value = "";
  taskInput.focus();
};

const handleTaskClick = (event) => {
  const clickedElement = event.target;

  if (clickedElement.tagName === "SPAN") {
    const taskItem = clickedElement.closest(".task-item");
    taskItem.classList.toggle("done");
  }

  if (clickedElement.classList.contains("delete-btn")) {
    const taskItem = clickedElement.closest(".task-item");
    taskItem.style.opacity = "0";
    setTimeout(() => {
      taskItem.remove();
    }, 300);
  }
};

// Event Listeners //

addTaskBtn.addEventListener("click", addTask); // Add Event Button

taskList.addEventListener("click", handleTaskClick); // Task Click

taskInput.addEventListener(
  "keydown",
  (enter = (event) => (event.key === "Enter" ? addTask() : null))
);
