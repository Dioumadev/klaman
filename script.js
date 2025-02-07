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