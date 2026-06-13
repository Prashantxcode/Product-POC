let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];

const container =
document.getElementById(
    "cart-container"
);

function renderCart() {

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <h2>
                🛒 Your Cart Is Empty
            </h2>

            <p>
                Add some products first.
            </p>
        `;

        document.getElementById(
            "total"
        ).textContent =
        "Total: ₹0";

        return;
    }

    let total = 0;

    cart.forEach(function (item) {

        total +=
        item.price *
        item.quantity;

        const div =
        document.createElement("div");

        div.classList.add(
            "cart-card"
        );

        div.innerHTML = `
            <img
                src="${item.thumbnail}"
                alt="${item.title}"
                width="120"
            >

            <h3>
                ${item.title}
            </h3>

           <p>Price: &#8377;${item.price}</p>

            <p>
                Qty: ${item.quantity}
            </p>

            <button
                onclick="increase(${item.id})"
            >
                +
            </button>

            <button
                onclick="decrease(${item.id})"
            >
                -
            </button>

            <button
                onclick="removeItem(${item.id})"
            >
                Remove
            </button>
        `;

        container.appendChild(div);

    });

    document.getElementById(
        "total"
    ).textContent =
    "Total: \u20B9" + total;
}

renderCart();

function increase(id) {

    let item =
    cart.find(function (p) {

        return p.id === id;

    });

    item.quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

function decrease(id) {

    let item =
    cart.find(function (p) {

        return p.id === id;

    });

    item.quantity--;

    if (item.quantity === 0) {

        cart =
        cart.filter(function (p) {

            return p.id !== id;

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

function removeItem(id) {

    cart =
    cart.filter(function (p) {

        return p.id !== id;

    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

const clearCartBtn =
document.getElementById(
    "clear-cart-btn"
);

if (clearCartBtn) {

    clearCartBtn.addEventListener(
        "click",
        function () {

            cart = [];

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            renderCart();
        }
    );

}