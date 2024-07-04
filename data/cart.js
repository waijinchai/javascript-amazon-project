export const cart = [];

export function addToCart(proudctId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (proudctId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity
        });
    }
}