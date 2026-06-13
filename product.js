const container = document.getElementById("product-details");

// 1. get product from localStorage
const product = JSON.parse(
    localStorage.getItem("selectedProduct")
);

// 2. safety check
if (!product) {
    container.innerHTML = "<h2>No product selected</h2>";
}

// 3. render UI
container.innerHTML = `
    <div class="product-page">

        <div class="product-left">
            <img src="${product.thumbnail}" />
        </div>

        <div class="product-right">

            <h1>${product.title}</h1>

           <p class="price">&#8377;${product.price}</p>

            <p>Discount: ${Math.round(product.discountPercentage)}%</p>

            <p>Rating: ⭐ ${product.rating}</p>

            <p>Brand: ${product.brand || "No Brand"}</p>

            <p class="desc">${product.description}</p>

            <p>SKU: ${product.id}</p>

            <p>Availability: In Stock</p>

            <p>Shipping: 3-5 Days</p>

            <p>Warranty: 1 Year</p>

            <button id="add-to-cart">Add to Cart</button>

            <button id="wishlist-btn">❤️ Wishlist</button>
            <h2>
    Reviews
</h2>

<div id="reviews-container">

</div>

        </div>

    </div>
`;


const reviewsContainer =
document.getElementById(
    "reviews-container"
);

const totalRating =
product.reviews.reduce(
    function(sum, review){

        return (
            sum +
            review.rating
        );

    },
    0
);

const averageRating =
(
    totalRating /
    product.reviews.length
).toFixed(1);

let fiveStar = 0;
let fourStar = 0;
let threeStar = 0;
let twoStar = 0;
let oneStar = 0;

reviewsContainer.innerHTML = `
    <div class="review-summary">

        <h3>
            Average Rating
        </h3>

        <p>
            ⭐ ${averageRating} / 5
        </p>

        <hr>

        <p>
            ⭐ 5 Star :
            ${fiveStar}
        </p>

        <p>
            ⭐ 4 Star :
            ${fourStar}
        </p>

        <p>
            ⭐ 3 Star :
            ${threeStar}
        </p>

        <p>
            ⭐ 2 Star :
            ${twoStar}
        </p>

        <p>
            ⭐ 1 Star :
            ${oneStar}
        </p>

    </div>
`;

product.reviews.forEach(
    function(review){

        if(review.rating === 5){
            fiveStar++;
        }

        else if(review.rating === 4){
            fourStar++;
        }

        else if(review.rating === 3){
            threeStar++;
        }

        else if(review.rating === 2){
            twoStar++;
        }

        else if(review.rating === 1){
            oneStar++;
        }

    }
);

product.reviews.forEach(
    function(review){

        const reviewCard =
        document.createElement(
            "div"
        );

        reviewCard.classList.add(
            "review-card"
        );

        reviewCard.innerHTML = `
            <h4>
                ${review.reviewerName}
            </h4>

            <p>
                Rating:
                ⭐${review.rating}
            </p>

            <p>
                ${review.comment}
            </p>

            <p>
                ${new Date(
                    review.date
                ).toLocaleDateString()}
            </p>
        `;

        reviewsContainer.appendChild(
            reviewCard
        );

    }
);

const cartBtn = document.getElementById("add-to-cart");

cartBtn.addEventListener("click", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(function (item) {
        return item.id === product.id;
    });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        const cartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1   
        };

        cart.push(cartProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
});

const wishlistBtn = document.getElementById("wishlist-btn");

wishlistBtn.addEventListener("click", function () {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Added to wishlist!");
});