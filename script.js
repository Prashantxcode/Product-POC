let currentView = "grid";

const container = document.getElementById("product-container");
const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const categoryFilter = document.getElementById("category-filter");
const ratingFilter = document.getElementById("rating-filter");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const productCount = document.getElementById("product-count");
const wishlistIcon =
document.getElementById(
    "wishlist-icon"
);

//let cart = JSON.parse(localStorage.getItem("cart")) || [];



let allProducts = [];

// Default view
container.classList.add("grid-view");

function renderProducts(products) {

    productCount.textContent = `Showing ${products.length} Products`;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <h2>No Products Found 😔</h2>
                <p>Try another search or clear filters.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    products.forEach(function (product) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <span class="discount-badge">
                ${Math.round(product.discountPercentage)}% OFF
            </span>

            <img src="${product.thumbnail}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>Price: ₹${product.price}</p>

            <p>Rating: ${product.rating}</p>

            <p>Brand: ${product.brand || "No Brand"}</p>
        `;

        // CLICK EVENT 
        card.addEventListener("click", function () {

            localStorage.setItem(
                "selectedProduct",
                JSON.stringify(product)
            );

            window.location.href = "product.html";
        });

        container.appendChild(card);
    });
}


// FILTER SYSTEM


function applyFilters() {

    let filteredProducts = [...allProducts];

    const searchValue = searchInput.value.toLowerCase();

    if (searchValue) {
        filteredProducts = filteredProducts.filter(function (product) {
            return product.title.toLowerCase().includes(searchValue);
        });
    }

    const selectedCategory = categoryFilter.value;

    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(function (product) {
            return product.category === selectedCategory;
        });
    }

    const selectedRating = Number(ratingFilter.value);

    if (selectedRating > 0) {
        filteredProducts = filteredProducts.filter(function (product) {
            return product.rating >= selectedRating;
        });
    }

    const sortValue = sortSelect.value;

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filteredProducts);
}


// VIEW TOGGLE


gridBtn.addEventListener("click", function () {
    currentView = "grid";
    container.classList.add("grid-view");
    updateCartCount();
    container.classList.remove("list-view");
});

listBtn.addEventListener("click", function () {
    currentView = "list";
    container.classList.add("list-view");
    container.classList.remove("grid-view");
});


// SEARCH (DEBOUNCE)


let searchTimer;

searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);

    searchTimer = setTimeout(function () {
        applyFilters();
    }, 300);
});


// SORT


sortSelect.addEventListener("change", function () {
    applyFilters();
});


// CLEAR FILTERS


clearFiltersBtn.addEventListener("click", function () {

    searchInput.value = "";
    categoryFilter.value = "all";
    ratingFilter.value = "0";
    sortSelect.value = "";

    applyFilters();
});


// FILTER EVENTS


categoryFilter.addEventListener("change", applyFilters);
ratingFilter.addEventListener("change", applyFilters);

function updateCartCount() {

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let totalItems = 0;

    cart.forEach(function(item){

        totalItems +=
        item.quantity || 1;

    });
   

    document.getElementById(
        "cart-count"
    ).textContent =
    totalItems;

    renderCartPreview();
}
 function updateWishlistCount() {

    let wishlist =
    JSON.parse(
        localStorage.getItem(
            "wishlist"
        )
    ) || [];

    document.getElementById(
        "wishlist-count"
    ).textContent =
    wishlist.length;
}
function renderCartPreview(){

    const preview =
    document.getElementById(
        "cart-preview"
    );

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    preview.innerHTML = "";

    if(cart.length === 0){

        preview.innerHTML =
        "<p>Cart Empty</p>";

        return;
    }

    cart.forEach(function(item){

        preview.innerHTML += `

    <div class="preview-item">

        <img
            src="${item.thumbnail}"
            alt="${item.title}"
        >

        <div>

            <h4>
                ${item.title}
            </h4>

            <p>
                Qty :
                ${item.quantity}
            </p>

            <p>
                ₹${item.price}
            </p>

        </div>

    </div>

`;

    });


}
const cartIcon =
document.getElementById(
    "cart-icon"
);

cartIcon.addEventListener(
    "click",
    function(){

        window.location.href =
        "cart.html";

    }
);
wishlistIcon.addEventListener(
    "click",
    function(){

        window.location.href =
        "wishlist.html";

    }
);


// LOAD PRODUCTS


container.innerHTML = `
    <div class="loader">Loading Products...</div>
`;

updateCartCount();

updateWishlistCount();

fetch("https://dummyjson.com/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        allProducts = data.products;

        const categories = allProducts.map(p => p.category);
        const uniqueCategories = [...new Set(categories)];

        uniqueCategories.forEach(function (category) {

            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);
        });

        renderProducts(allProducts);
        updateCartCount();
    })
    .catch(function (error) {
        console.log("Error fetching products:", error);
    });