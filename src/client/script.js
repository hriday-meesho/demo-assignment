document.addEventListener("DOMContentLoaded", function () {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      generateProductList(data);
      document
        .getElementById("price-low")
        .addEventListener("click", () => sortBy(data, "price-low"));
      document
        .getElementById("price-high")
        .addEventListener("click", () => sortBy(data, "price-high"));
      document
        .getElementById("rating-low")
        .addEventListener("click", () => sortBy(data, "rating-low"));
      document
        .getElementById("rating-high")
        .addEventListener("click", () => sortBy(data, "rating-high"));
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function generateProductList(products) {
  const productListContainer = document.getElementById("product-list");
  const productHTML = [];

  products.forEach((product) => {
    const productItemHTML = `
          <div class="product-item">
              <img src="${product.image}" alt="${product.title}">
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
          </div>
      `;
    productHTML.push(productItemHTML);
  });
  productListContainer.innerHTML = productHTML.join("");
}

function sortBy(data, criterion) {
  switch (criterion) {
    case "price-low":
      data.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      data.sort((a, b) => b.price - a.price);
      break;
    case "rating-low":
      data.sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    case "rating-high":
      data.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    default:
      data.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
  }

  generateProductList(data);
  updateActiveButton(criterion);
}

function updateActiveButton(activeButtonId) {
  const buttons = document.querySelectorAll("#sort-bar button");
  buttons.forEach((button) => button.classList.remove("active"));
  document.getElementById(activeButtonId).classList.add("active");
}
