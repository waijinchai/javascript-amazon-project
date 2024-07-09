import { loadProductsFetch, getProduct } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function renderTracking() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const order = getOrder(url.searchParams.get("orderId"));
    const product = getProduct(url.searchParams.get("productId"));

    let productDetails;
    order.products.forEach((details) => {
        if (details.productId === product.id) {
            productDetails = details;
        }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const deliveryProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    const trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format("dddd, MMMM D")}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label
            ${deliveryProgress < 50 ? "current-status": ""}">
                Preparing
            </div>
            <div class="progress-label
            ${(deliveryProgress >= 50 && deliveryProgress < 100) ? "current-status": ""}">
                Shipped
            </div>
            <div class="progress-label
            ${deliveryProgress >= 100 ? "current-status": ""}">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width:${deliveryProgress}%"></div>
        </div>
    `;

    document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}

renderTracking();