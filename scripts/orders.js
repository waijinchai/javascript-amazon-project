import { orders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function renderOrders() {
    await loadProductsFetch();
    
    let ordersHTML = "";

    orders.forEach((order) => {
        const orderTime = dayjs(order.orderTime);
        const orderTimeString = orderTime.format("MMMM D");

        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTimeString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${productsListHTML(order)}
                </div>
            </div>
        `;
    });

    function productsListHTML(order) {
        let productsListHTML = "";

        order.products.forEach((productDetails) => {
            const product = getProduct(productDetails.productId);

            productsListHTML += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format("MMMM D")}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${productDetails.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again-button"
                    data-product-id="${product.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary js-track-package-button"
                        data-order-id="${order.id}" data-product-id="${product.id}">
                            Track package
                        </button>
                    </a>
                </div>
            `;
        });

        return productsListHTML;
    }

    document.querySelector(".js-orders-grid").innerHTML = ordersHTML;

    // make Buy It Again button interactive
    document.querySelectorAll(".js-buy-again-button").forEach((button) => {
        button.addEventListener("click", () => {
            const { productId } = button.dataset;
            addToCart(productId);

            button.innerHTML = "Added";
            setTimeout(() => {
                button.innerHTML = `
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                `;
            }, 1000);
        });
    });

    // make Track package button interactive
    document.querySelectorAll(".js-track-package-button").forEach((button) => {
        button.addEventListener("click", () => {
            const { orderId, productId } = button.dataset;
            window.location.href = `tracking.html?orderId="${orderId}"&productId="${productId}"`
        });
    })
}

renderOrders();