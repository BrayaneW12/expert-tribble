// Déclaration globale des éléments DOM
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

// Stocker les produits dans un tableau
const cart = [];

function addToCart(item, price) {
  cart.push({ item, price }); // Stocke le produit dans le tableau
  updateCartDisplay();
}

function removeFromCart(itemIndex, price) {
  cart.splice(itemIndex, 1); // Supprime le produit du tableau
  updateCartDisplay(price, 'remove');
}

function updateCartDisplay(priceChange = 0, action = 'add') {
  cartItems.innerHTML = ''; // Vide le panier
  let total = 0;

  cart.forEach((product, index) => {
    total += product.price;

    // Créer un élément de produit avec un bouton de suppression
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = `${product.item} - ${product.price}€`;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn-sm';
    removeButton.textContent = 'Retirer';
    removeButton.onclick = () => removeFromCart(index, product.price);

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });

  // Met à jour le prix total
  totalPrice.textContent = `Total : ${total.toFixed(2)}€`;
}

// Validation du formulaire
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;
  let errorMsg = '';

  // Validation du nom
  if (nom === '') {
    valid = false;
    errorMsg = 'Le champ "Nom" est requis.';
  }
  // Validation de l'email
  else if (!validateEmail(email)) {
    valid = false;
    errorMsg = 'Veuillez entrer un email valide.';
  }
  // Validation du message
  else if (message === '') {
    valid = false;
    errorMsg = 'Le champ "Message" est requis.';
  }

  if (!valid) {
    alert(errorMsg);
  } else {
    alert('Formulaire envoyé avec succès !');
    this.submit(); // Soumet le formulaire si tout est valide
  }
});

// Fonction pour valider un email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Lazy Loading des images
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll('img.lazy');

  const loadImage = (image) => {
    image.src = image.getAttribute('data-src');
    image.classList.remove('lazy');
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  lazyImages.forEach(image => {
    observer.observe(image);
  });
});