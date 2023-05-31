<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Total: {{ sale.total }}</h2>
      <p>{{ sale.createdAt }}</p>
      <div class="card-actions justify-end">
        <button @click="gotoSale" class="btn btn-primary">Ver Compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "Sale",
  data() {
    return {
      products: [],
      totalValue: 0,
      payment_method: "",
    };
  },
  methods: {
    getProductInfo(id) {
      api.get(`/product/${id}`).then((product) => {
        this.products.push(product.data);
      });
    },
    getAllProducts() {
      this.sale.productId.forEach((id) => {
        this.getProductInfo(id);
      });
    },
    gotoSale(id) {
      this.$router.push(`/sale/${this.sale.id}`);
    },
  },
  props: {
    sale: {},
    required: false,
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>
