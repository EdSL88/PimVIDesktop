import { createStore } from 'vuex';

const store = createStore({
    state: {
        isLoggedIn: false,
        cart: [],
        
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        },
        addToCart(state, product) {
            state.cart.push(product);
        },
        removeFromCart(state, id) {
            const indexToRemove = state.cart.indexOf(id);
            if (indexToRemove > -1) {
                // Use splice() to remove the variable from the array
                state.cart.splice(indexToRemove, 1);
            }
        },

        clearCart(state) {
            state.cart = [];
        }
    },
});

export default store;