import { handleLogin } from "./auth/auth.js";
import { handleRegister } from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      await handleLogin(email, password);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const password2 = document.getElementById("register-password").value;
      await handleLogin(email, password, password2);
    });
  }
});
