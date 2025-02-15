import instance from "../api.js";

export const handleLogin = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      console.log(response.data.message);
      return true;
    } else {
      alert("Ошибка: " + response.data.message);
      return false;
    }
  } catch (error) {
    if (error.response) {
      alert("Ошибка при входе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
    throw error;
  }
};

export const handleRegister = async (email, password, password2) => {
  if (!(password === password2)) {
    alert("Пароли не совпадают.");
    return false;
  }
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
    });

    if (response) {
      console.log(response.data.message);
      return true;
    } else {
      alert("Ошибка: " + response.data.message);
      return false;
    }
  } catch (error) {
    if (error.response) {
      alert("Ошибка при входе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const response = await instance.post("/auth/logout");
    if (response.data.success) {
      return true;
    } else {
      alert("Ошибка: " + response.data.message);
      return false;
    }
  } catch (error) {
    if (error.response) {
      alert("Ошибка при выходе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
    throw error;
  }
};
