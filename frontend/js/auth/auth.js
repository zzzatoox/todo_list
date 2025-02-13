import instance from "../api.js";

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

export const handleLogin = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });

    console.log(response.data.message);
    return response.data;
  } catch (error) {
    if (error.response) {
      alert("Ошибка при входе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
    throw error;
  }
};

export const handleRegister = async (email, password) => {
  if (!(password === password2)) {
    alert("Пароли не совпадают.");
    return;
  }
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
    });

    console.log(response.data.message);
    return response.data;
  } catch (error) {
    if (error.response) {
      alert("Ошибка при входе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
    throw error;
  }
};
