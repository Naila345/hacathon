document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks1 = document.querySelector(".nav-links-1 ul");
  const navLinks2 = document.querySelector(".nav-links-2 ul");

  // Toggle visibility of nav links on hamburger menu click
  hamburgerMenu.addEventListener("click", () => {
    navLinks1.classList.toggle("show");
    navLinks2.classList.toggle("show");
  });

  // Close the menu when a link is clicked (optional)
  const navLinks = document.querySelectorAll(".nav-links-1 ul li a, .nav-links-2 ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks1.classList.remove("show");
      navLinks2.classList.remove("show");
    });
  });
});

// Slider Functionality
const track = document.querySelector(".slider-track");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentSlide = 0;

function calculateDimensions() {
  const card = document.querySelector(".card");
  const cardWidth = card.offsetWidth + 10; // Include margin
  const slider = document.querySelector(".slider");
  const sliderWidth = slider.offsetWidth;
  const cardsToShow = Math.floor(sliderWidth / cardWidth);
  const totalCards = document.querySelectorAll(".card").length;

  return { cardWidth, cardsToShow, totalCards };
}

function updateSlider() {
  const { cardWidth, cardsToShow, totalCards } = calculateDimensions();
  const offset = -(currentSlide * cardWidth);
  track.style.transform = `translateX(${offset}px)`;

  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide >= totalCards - cardsToShow;
}

nextButton.addEventListener("click", () => {
  const { cardsToShow, totalCards } = calculateDimensions();
  if (currentSlide < totalCards - cardsToShow) {
    currentSlide++;
    updateSlider();
  }
});

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);
updateSlider();

// Cart Functionality
const cart = [];
const cartCountElement = document.getElementById("cart-count");

const cartModal = document.getElementById("cart-modal");
const closeModalButton = document.getElementById("close-modal");
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

const shopNowButtons = document.querySelectorAll(".shopnow-btn");

shopNowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const productName = card.querySelector("h3").textContent;
    const productPrice = parseFloat(
      card.querySelector("h4").textContent.replace(/[^0-9.-]+/g, "")
    );

    const product = { name: productName, price: productPrice };
    cart.push(product);
    alert(`${productName} has been added to the cart`);
    updateCart();
  });
});

function updateCart() {
  cartCountElement.innerHTML = `
    <img class="cart" src="assets/shopping-bag.png" alt="cart-icon">
    <span class="cart-count-badge">${cart.length}</span>
  `;
}

cartCountElement.addEventListener("click", () => {
  updateCartModal();
  cartModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  cartModal.style.display = "none";
});

function updateCartModal() {
  cartItemsElement.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((product) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <p>${product.name}</p>
      <p>Price: $${product.price}</p>
    `;

    cartItemsElement.appendChild(itemElement);
    totalPrice += product.price;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

window.onclick = (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
};

// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAfgI-QtVVXjZxMDgRAfCd0S5kGv-Mum7c",
  authDomain: "hacathon-cfc06.firebaseapp.com",
  databaseURL: "https://hacathon-cfc06-default-rtdb.firebaseio.com",
  projectId: "hacathon-cfc06",
  storageBucket: "hacathon-cfc06.appspot.com",
  messagingSenderId: "763629175263",
  appId: "1:763629175263:web:f71984084aaf5f78d5846a"
};
firebase.initializeApp(firebaseConfig);
const HacathonDB = firebase.database().ref("Hacathon");

document.getElementById("Hacathon").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const name = getElementVal("name");
  const email = getElementVal("email");
  const message = getElementVal("message");

  saveMessages(name, email, message);

  document.querySelector(".alert").style.display = "block";
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("Hacathon").reset();
}

const saveMessages = (name, email, message) => {
  const newContactForm = HacathonDB.push();
  newContactForm.set({
    name: name,
    emailid: email,
    msgContent: message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
