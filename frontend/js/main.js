import { handleLogin } from "./auth/auth.js";
import { handleRegister } from "./auth/auth.js";
import { handleLogout } from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
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
});
