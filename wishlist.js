console.log("Wishlist Page Loaded" );
let wishlist =
JSON.parse(
    localStorage.getItem(
        "wishlist"
    )
) || [];

const container =
document.getElementById(
    "wishlist-container"
);

function renderWishlist(){

    container.innerHTML = "";

    if(
        wishlist.length === 0
    ){

        container.innerHTML = `
            <h2>
                ❤️ Wishlist Empty
            </h2>

            <p>
                Add some products first.
            </p>
        `;

        return;
    }

    wishlist.forEach(
        function(item){

            const card =
            document.createElement(
                "div"
            );

            card.classList.add(
                "card"
            );

            card.innerHTML = `
                <img
                    src="${item.thumbnail}"
                    alt="${item.title}"
                >

                <h3>
                    ${item.title}
                </h3>

                <p>
                    Price:
                    ₹${item.price}
                </p>

                <button
                    onclick="removeWishlistItem(${item.id})"
                >
                    Remove
                </button>
            `;

            container.appendChild(
                card
            );

        }
    );

}

renderWishlist();


function removeWishlistItem(id){

    wishlist =
    wishlist.filter(
        function(item){

            return (
                item.id !== id
            );

        }
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(
            wishlist
        )
    );

    renderWishlist();

}