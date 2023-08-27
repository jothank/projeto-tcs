document.addEventListener("DOMContentLoaded", function () {
  const resetForm = document.getElementById("reset-form");
  const successMessage = document.getElementById("message-success");
  const errorMessage = document.getElementById("message-error");

  resetForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    successMessage.textContent = "";
    errorMessage.textContent = "";

    const formData = new FormData(resetForm);
    const email = formData.get("email");

    if (email) {
      try {
        const csrftoken = document.querySelector(
          "[name=csrfmiddlewaretoken]"
        ).value;

        const response = await fetch("/api/v1/password/reset/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          successMessage.textContent =
            "E-mail de redefinição enviado com sucesso.";
          successMessage.classList.add("active");
          setTimeout(() => {
            successMessage.classList.remove("active");
          }, 10000);
        } else {
          errorMessage.textContent = "Erro ao enviar o e-mail de redefinição.";
          errorMessage.classList.add("active");
          setTimeout(() => {
            errorMessage.classList.remove("active");
          }, 10000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  });

  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.classList.remove("active");
    });
  });
});
