function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId, quantity=1) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
        
            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: "1"
                });
            }
        
            this.saveToStorage();
        },
    
        removeFromCart(productId) {
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
                
            });
        
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        },
    
        calculateCartQuantity() {
            let cartQuantity = 0;
        
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            return cartQuantity;
        },
    
        updateQuantity(productId, newQuantity) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.quantity = newQuantity;
                    this.saveToStorage();
                }
            });
        }
    };

    return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();
