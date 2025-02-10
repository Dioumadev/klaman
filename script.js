// script.js

// Sélectionner les éléments
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Ajouter l'événement de clic
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

function toggleMenu() {
    let menu = document.querySelector(".nav-links");
    menu.classList.toggle("show");
}


function toggleFavoris(icon) {
    icon.classList.toggle('active');

    let produit = icon.parentElement.parentElement;
    let nomProduit = produit.querySelector("h3").innerText;
    let prixProduit = produit.querySelector(".prix").innerText;
    let imageProduit = produit.querySelector("img").src;

    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    if (icon.classList.contains("active")) {
        favoris.push({ nom: nomProduit, prix: prixProduit, image: imageProduit });
    } else {
        favoris = favoris.filter(item => item.nom !== nomProduit);
    }

    localStorage.setItem("favoris", JSON.stringify(favoris));
}

function afficherCommentaires(articleId) {
    // Redirige vers la page article avec les commentaires ouverts
    window.location.href = articleId + ".html#commentaires";
}

document.addEventListener("DOMContentLoaded", function () {
    let cartCount = localStorage.getItem("cartCount") || 0;
    let cartNotif = document.getElementById("cart-count");

    function updateCartCount(count) {
        cartNotif.textContent = count; // Met à jour le texte
        cartNotif.style.visibility = "visible"; // Toujours visible, même à 0
        localStorage.setItem("cartCount", count); // Stocke la valeur
    }

    // Afficher la quantité au chargement
    updateCartCount(cartCount);

    // Ajouter un produit au panier (test)
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            cartCount++;
            updateCartCount(cartCount);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const resultsContainer = document.getElementById("results-container");

    // Liste des produits (simulée)
    const produits = [
        { nom: "T-shirt Rouge", image: "tshirt-rouge.jpg" },
        { nom: "Chaussures Sport", image: "chaussures-sport.jpg" },
        { nom: "Montre Luxe", image: "montre-luxe.jpg" },
        { nom: "Sac à dos", image: "sac-a-dos.jpg" }
    ];

    // Fonction de recherche
    function rechercherProduit() {
        let query = searchInput.value.toLowerCase();
        resultsContainer.innerHTML = ""; // Vider les résultats

        let results = produits.filter(produit => produit.nom.toLowerCase().includes(query));

        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>Aucun produit trouvé.</p>";
            return;
        }

        results.forEach(produit => {
            let card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${produit.image}" alt="${produit.nom}">
                <h3>${produit.nom}</h3>
                <button class="view-product">Voir le produit</button>
            `;

            resultsContainer.appendChild(card);
        });
    }

    // Déclencher la recherche en cliquant sur le bouton
    searchBtn.addEventListener("click", rechercherProduit);

    // Déclencher la recherche en appuyant sur "Entrée"
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            rechercherProduit();
        }
    });
});
