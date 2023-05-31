import { createApp } from "vue";
import "./styles.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { createVuetify } from 'vuetify';
import NProgress from 'nprogress';
// import 'vuetify/styles'
import 'nprogress/nprogress.css';
import * as components from 'vuetify/components'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faLock, faLockOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

// import * as directives from 'vuetify/directives'
import store from "./store";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: "Login",
            component: () => import("./views/Login.vue")
        },
        {
            path: "/",
            name: "Home",
            component: () => import("./views/Home.vue")
        },
        {
            path: "/user",
            name: "User",
            component: () => import("./views/User.vue")
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("./views/Register.vue")
        },
        {
            path: "/cart",
            name: "Cart",
            component: () => import("./views/Cart.vue")
        },
        {
            path: "/product/:id",
            name: "Product",
            component: () => import("./views/Product.vue")
        },
        {
            path: "/sale/:id",
            name: "Compra",
            component: () => import("./views/Sales.vue")
        }
    ],
})
router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

library.add(faUserSecret, faLock, faLockOpen, faShoppingCart)
const vuetify = createVuetify({
    components,
    theme: {
        defaultTheme: 'dark',
    }
})

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(vuetify).use(store).mount("#app");
