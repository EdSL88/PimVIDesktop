<template>
  <div class="product">
    <div class="card w-full bg-base-100 shadow-xl">
      <figure>
        <img :src="product.image" alt="Produto" />
      </figure>
      <div class="card-body">
        <h3 class="card-title">{{ product.category }}</h3>
        <h2 class="card-title">{{ product.name }} R$ {{ product.price }}</h2>
        <p>{{ product.description }}</p>
        <div class="card-actions justify-center">
          <button @click="voltar" class="btn btn-primary">Voltar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "ProductPage",
  data() {
    return {
      product: {},
      product_id: "",
    };
  },
  methods: {
    setId() {
      this.product_id = this.$route.params.id;
    },
    setProduct() {
      api.get(`/product/${this.product_id}`).then((response) => {
        this.product = response.data;
      });
    },
    voltar() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.setId();
    this.setProduct();
  },
};
</script>
