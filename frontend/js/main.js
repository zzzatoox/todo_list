import { handleLogin } from "./auth/auth.js";
import { handleRegister } from "./auth/auth.js";
import { handleLogout } from "./auth/auth.js";
import {
  fetchTasks,
  createTask,
  getTaskById,
  deleteTask,
} from "./tasks/tasks.js";

document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      try {
        const isLoggedIn = await handleLogin(email, password);
        if (isLoggedIn) {
          window.location.href = "../index.html";
        }
      } catch (error) {
        // console.error("Ошибка при обработке входа:", error);
      }
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const password2 = document.getElementById("register-password2").value;
      try {
        const isRegistered = await handleRegister(email, password, password2);
        if (isRegistered) {
          alert("Успешная регистрация");
          window.location.href = "../auth/login.html";
        }
      } catch (error) {
        // console.error("Ошибка при обработке регистрации:", error);
      }
    });
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        const isLoggedOut = await handleLogout();
        if (isLoggedOut) {
          window.location.href = "/frontend/auth/login.html";
        }
      } catch (error) {
        // console.error("Ошибка при обработке выхода:", error);
      }
    });
  }

  const taskListContainer = document.getElementById("task-list");
  if (taskListContainer) {
    try {
      const tasks = await fetchTasks();
      renderTasks(tasks);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  }
});

function renderTasks(tasks) {
  const taskListContainer = document.getElementById("task-list");
  if (!taskListContainer) {
    console.error("Элемент #task-list не найден!");
    return;
  }

  taskListContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    taskItem.innerHTML = `
      <div type="button" class="card task-card" data-toggle="modal" data-target="#descriptionTaskModal" onclick="showTaskDetails(${
        task.task_id
      })">
      <div class="container_task-card">
        <div class="card-info">
          <div class="form-check">
            <input class="form-check-input check-complete" type="checkbox" value="" id="defaultCheck${
              task.task_id
            }">
            <label class="form-check-label" for="defaultCheck${task.task_id}">
              <p>${task.title}</p>
            </label>
          </div>
          ${
            task.name === "Высокий"
              ? '<span class="badge badge-danger badge-pill">Важно!</span>'
              : ""
          }
          <div class="task-time d-flex align-items-center">${
            task.due_date
              ? new Date(task.due_date).toLocaleString()
              : "Не определено"
          }</div>
        </div>
        <div class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false"></a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="event.stopPropagation(); handleDeleteTask(${
              task.task_id
            })">Удалить</a></li>
            <li><a class="dropdown-item" data-toggle="modal" data-target="#editTaskModal" onclick="event.stopPropagation(); handleEditTask(${
              task.task_id
            })">Редактировать</a></li>
          </ul>
        </div>
      </div>
      </div>
    `;

    const checkbox = taskItem.querySelector(".check-complete");
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
      handleTaskCompletion(e.target.dataset.taskId);
    });

    taskItem.addEventListener("click", (e) => {
      if (!e.target.classList.contains("check-complete")) {
        showTaskDetails(task.task_id);
      }
    });

    taskListContainer.appendChild(taskItem);
  });
}

window.addTask = async () => {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const due_date = date && time ? `${date}T${time}:00` : null;
  const priority_id = document.getElementById("flexCheckChecked").checked
    ? 2
    : 1;
  try {
    await createTask(title, description, due_date, priority_id);
    const tasks = await fetchTasks();
    renderTasks(tasks);
    $("#addTaskModal").modal("hide");
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
  }
};

window.showTaskDetails = async (taskId) => {
  try {
    const task = await getTaskById(taskId);

    document.getElementById("taskDetailDescription").innerText =
      task.description ||
      "Описание отсутствует. Чтобы добавить, отредактируйте задачу.";

    $("#taskDetailModal").modal("show");
  } catch (error) {
    console.error("Ошибка при получении данных задачи:", error);
    alert("Не удалось загрузить данные задачи.");
  }
};

let currentTaskId = null;

window.handleEditTask = async (taskId) => {
  currentTaskId = taskId;
  const task = await getTaskById(taskId);
  document.getElementById("editTaskTitle").value = task.title;
  document.getElementById("editTaskDescription").value = task.description || "";
  if (task.due_date) {
    const dueDate = new Date(task.due_date);
    const formattedDate = dueDate.toISOString().split("T")[0];
    const formattedTime = dueDate.toTimeString().split(" ")[0].substring(0, 5);

    document.getElementById("editDate").value = formattedDate;
    document.getElementById("editTime").value = formattedTime;
  } else {
    document.getElementById("editDate").value = "";
    document.getElementById("editTime").value = "";
  }
  document.getElementById("editFlexCheckChecked").checked =
    task.priority_name === "Высокий";
  $("#editTaskModal").modal("show");
};

window.updateTask = async () => {
  const title = document.getElementById("editTaskTitle").value;
  const description = document.getElementById("editTaskDescription").value;
  const date = document.getElementById("editDate").value;
  const time = document.getElementById("editTime").value;
  const due_date = date && time ? `${date}T${time}:00` : null;
  const priority_id = document.getElementById("editFlexCheckChecked").checked
    ? 1
    : 2;

  try {
    await updateTask(currentTaskId, title, description, due_date, priority_id);
    const tasks = await fetchTasks();
    renderTasks(tasks);
    $("#editTaskModal").modal("hide");
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
  }
};

window.handleDeleteTask = async (taskId) => {
  try {
    await deleteTask(taskId);
    const tasks = await fetchTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
};
