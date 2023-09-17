document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const loginData = {
                username: username,
                password: password
            };

            fetch("/accounts/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify(loginData),
            })
                .then(function (response) {
                    if (response.status === 200) {
                        window.location.href = "main_page/";
                    } else {
                        const errorMessage = document.getElementById("message-error");
                        errorMessage.textContent = "Credenciais inválidas. Tente novamente.";
                        errorMessage.classList.add("active");
                        setTimeout(() => {
                            errorMessage.classList.remove("active");
                        }, 5000);
                    }
                })
                .catch(function (error) {
                    console.error("Erro na requisição:", error);
                });

            const closeButtons = document.querySelectorAll(".close-button");
            closeButtons.forEach(button => {
                button.addEventListener("click", () => {
                    button.parentNode.classList.remove("active");
                });
            });
        });
    }
});
