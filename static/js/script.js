document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.getElementById("content-container");

    // Função para carregar conteúdo no lado direito
    function loadContent(content) {
        contentContainer.innerHTML = content;
    }

    // Event listeners para os itens do menu
    document.getElementById("menu-item-1").addEventListener("click", function () {
        loadContent("<h1>Conteúdo do Item de Menu 1</h1><p>Este é o conteúdo do primeiro item de menu.</p>");
    });

    document.getElementById("menu-item-2").addEventListener("click", function () {
        loadContent("<h1>Conteúdo do Item de Menu 2</h1><p>Este é o conteúdo do segundo item de menu.</p>");
    });

    document.getElementById("menu-item-3").addEventListener("click", function () {
        loadContent("<h1>Conteúdo do Item de Menu 3</h1><p>Este é o conteúdo do terceiro item de menu.</p>");
    });
});
