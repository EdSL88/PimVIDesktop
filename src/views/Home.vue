<template>
  <div class="index">
    <div class="">
      <img src="/logo.png" class="mx-auto" />
    </div>

    <div class="icon">
      <p>Produtos</p>
    </div>

    <div class="product" v-for="product in products" :key="product.id">
      <Product :product="product" :is-sale="true" />
    </div>
  </div>
</template>
<style scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product-image {
  width: 100px;
  height: 100px;
}
.products {
  display: grid;
}
.product {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid black;
  margin: 10px;
}
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 100px;
  margin: 10px;
}
</style>
<script>
import api from "../api";
import Categoria from "../components/Categoria.vue";
import Product from "../components/Product.vue";

export default {
  data() {
    return {
      dialog: false,
      logged: false,
      token: localStorage.token,
      products: [],
      products_added: [],
    };
  },
  methods: {

  },
  mounted() {
    if (localStorage.token) {
      this.logged = true;
      this.$store.commit("setLoggedIn", true);
    } else {
      this.logged = false;
    }
    api.get("/product").then((response) => {
      console.log(response);
      this.products = response.data;
    });
    this.products_added = this.$store.state.cart;
  },
  components: {
    Categoria,
    Product,
  },
};
</script>
