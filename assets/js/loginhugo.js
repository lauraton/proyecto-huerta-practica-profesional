document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Manejador del evento Submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Detiene el envío automático

    // Resetear estados visuales previos
    resetErrors();

    let isValid = true;

    // 1. Validación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, "Por favor, ingresá tu correo.");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, "El formato de correo no es válido.");
      isValid = false;
    }

    // 2. Validación de Contraseña (Mínimo 8 caracteres, letras y números)
    const passwordValue = passwordInput.value;
    const hasLetter = /[a-zA-Z]/.test(passwordValue);
    const hasNumber = /\d/.test(passwordValue);

    if (!passwordValue) {
      showError(
        passwordInput,
        passwordError,
        "Por favor, ingresá tu contraseña.",
      );
      isValid = false;
    } else if (passwordValue.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "Debe contener al menos 8 caracteres.",
      );
      isValid = false;
    } else if (!hasLetter || !hasNumber) {
      showError(
        passwordInput,
        passwordError,
        "Debe incluir al menos una letra y un número.",
      );
      isValid = false;
    }

    // Si todo está correcto
    if (isValid) {
      console.log("Validación exitosa. Enviando datos...", {
        email: emailInput.value.trim(),
        // En producción jamás expongas o guardes contraseñas en texto plano en los logs
        password: "*****",
      });

      alert("¡Ingreso exitoso! (Simulado)");
      // Aquí iría tu fetch() o petición al servidor/base de datos.
    }
  });

  // Funciones auxiliares para simplificar el código
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.textContent = message;
  }

  function resetErrors() {
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
    emailError.textContent = "";
    passwordError.textContent = "";
  }
});
