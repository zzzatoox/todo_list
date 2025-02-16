import instance from "../api.js";

export const fetchTasks = async () => {
  try {
    const response = await instance.get("/tasks");
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Ошибка при получении задач:", error.message);
    throw error;
  }
};

export const createTask = async (title, description, due_date, priority_id) => {
  try {
    const taskData = {
      title,
      status_id: 1,
      priority_id,
    };

    if (description) {
      taskData.description = description;
    }

    if (due_date) {
      taskData.due_date = due_date;
    }
    const response = await instance.post("/tasks", taskData);
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Ошибка при создании задачи:", error.message);
    throw error;
  }
};

export const getTaskById = async (task_id) => {
  try {
    const response = await instance.get(`/tasks/${task_id}`);

    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {}
};

export const deleteTask = async (taskId) => {
  try {
    const response = await instance.delete(`/tasks/${taskId}`);
    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error.message);
    throw error;
  }
};
