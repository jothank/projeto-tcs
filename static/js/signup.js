function isValidPassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
}

function passwordsMatch(password1, password2) {
    return password1 === password2;
}

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const successMessage = document.getElementById("message-success");
    const errorMessage = document.getElementById("message-error");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        successMessage.textContent = "";
        errorMessage.textContent = "";

        const formData = new FormData(signupForm);
        const username = formData.get("username");
        const email = formData.get("email");
        const password1 = formData.get("password1");
        const password2 = formData.get("password2");

        // Validações das senhas
        if (!isValidPassword(password1)) {
            errorMessage.textContent = "A senha deve ter pelo menos 8 caracteres, incluindo números, letras maiúsculas, letras minúsculas e caracteres especiais.";
            setTimeout(() => {
                errorMessage.classList.remove("active");
              }, 5000); 
            return;
        }
        if (!passwordsMatch(password1, password2)) {
            errorMessage.textContent = "As senhas não coincidem.";
            setTimeout(() => {
                errorMessage.classList.remove("active");
              }, 5000); 
            return;
        }

        try {
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            const response = await fetch("/accounts/register/", {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({ username, email, password1, password2 }),
            });

            if (response.ok) {
                successMessage.textContent = "Registro realizado com sucesso!";
                successMessage.classList.add("active");
                setTimeout(() => {
                    successMessage.classList.remove("active");
                }, 5000); 
            } else {
                errorMessage.textContent = "Erro ao registrar.";
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
