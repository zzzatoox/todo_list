import axios from "https://cdn.skypack.dev/axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });

    console.log(response.data.message);
  } catch (error) {
    if (error.response) {
      alert("Ошибка при входе: " + error.response.data.message);
    } else {
      alert("Произошла ошибка: " + error.message);
    }
  }
});

// registerForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = document.getElementById("register-email").value;
//   console.log(email);
//   const password = document.getElementById("register-password").value;
//   console.log(password);
//   const password2 = document.getElementById("register-password2").value;
//   console.log(password2);

//   if (!(password === password2)) {
//     alert("Пароли не совпадают.");
//     return;
//   }

//   try {
//     const response = await instance.post("/auth/register", {
//       email,
//       password,
//     });

//     console.log(response.data.message);
//   } catch (error) {
//     if (error.response) {
//       alert("Ошибка при входе: " + error.response.data.message);
//     } else {
//       alert("Произошла ошибка: " + error.message);
//     }
//   }
// });
