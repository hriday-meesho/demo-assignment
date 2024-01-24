document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      generateProductList(data);
      document
        .getElementById("sortByPriceLow")
        .addEventListener("click", () => sortByPriceLow(data));
      document
        .getElementById("sortByPriceHigh")
        .addEventListener("click", () => sortByPriceHigh(data));
      document
        .getElementById("sortByRatingLow")
        .addEventListener("click", () => sortByRatingLow(data));
      document
        .getElementById("sortByRatingHigh")
        .addEventListener("click", () => sortByRatingHigh(data));
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function generateProductList(products) {
  //console.log(products);
  const productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("div");
    listItem.classList.add("product-item");

    listItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
        `;

    productListContainer.appendChild(listItem);
  });
}

function sortByPriceLow(data) {
  data.sort((a, b) => a.price - b.price);
  generateProductList(data);
  updateActiveButton("sortByPriceLow");
}

function sortByPriceHigh(data) {
  data.sort((a, b) => b.price - a.price);
  generateProductList(data);
  updateActiveButton("sortByPriceHigh");
}

function sortByRatingLow(data) {
  data.sort((a, b) => a.rating.rate - b.rating.rate);
  generateProductList(data);
  updateActiveButton("sortByRatingLow");
}

function sortByRatingHigh(data) {
  data.sort((a, b) => b.rating.rate - a.rating.rate);
  generateProductList(data);
  updateActiveButton("sortByRatingHigh");
}

function updateActiveButton(activeButtonId) {
  const buttons = document.querySelectorAll("#sort-bar button");
  buttons.forEach((button) => button.classList.remove("active"));
  document.getElementById(activeButtonId).classList.add("active");
}
