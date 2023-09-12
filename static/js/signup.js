document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const successMessage = document.getElementById("message-success");
    const errorMessage = document.getElementById("message-error");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        successMessage.textContent = "";
        errorMessage.textContent = "";

        const formData = new FormData(signupForm);
        // const firstName = formData.get("first_name");
        // const lastName = formData.get("last_name");
        const username = formData.get("username");
        const email = formData.get("email");
        const password1 = formData.get("password1");
        const password2 = formData.get("password2");

        try {
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            const response = await fetch("/accounts/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                // body: JSON.stringify({ firstName, lastName, username, email, password1, password2 }),
                body: JSON.stringify({ username, email, password1, password2 }),
            });

            const data = await response.json();

            if (response.ok) {
                successMessage.textContent = "Registro realizado com sucesso!";
                successMessage.classList.add("active");
                setTimeout(() => {
                    successMessage.classList.remove("active");
                }, 5000);
            } else {
                if (data && data.password_validation_error) {
                    errorMessage.textContent = errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres, incluindo números, letras maiúsculas, letras minúsculas e caracteres especiais.";
                } else if (data && data.username && data.username.length > 0) {
                    errorMessage.textContent = errorMessage.textContent = "O nome de usuário já está sendo usado por outro usuário.";
                } else if (data && data.email && data.email.length > 0) {
                    errorMessage.textContent = errorMessage.textContent = "O email já está sendo usado por outro usuário.";
                } else if (data && data.password1 && data.password1.length > 0) {
                    errorMessage.textContent = errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres, incluindo números, letras maiúsculas, letras minúsculas e caracteres especiais.";
                } else if (data && data.password2 && data.password2.length > 0) {
                    errorMessage.textContent = errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres, incluindo números, letras maiúsculas, letras minúsculas e caracteres especiais.";
                } else if (data && data.non_field_errors && data.non_field_errors.length > 0) {
                    errorMessage.textContent = "As senhas não coincidem.";
                } else if (data && data.detail) {
                    errorMessage.textContent = errorMessage.textContent = "Ocorreu um erro ao registrar.";
                } else {
                    errorMessage.textContent = "Erro ao registrar.";
                }
                errorMessage.classList.add("active");
                setTimeout(() => {
                    errorMessage.classList.remove("active");
                }, 5000);
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        }
    });
});

