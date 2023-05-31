<template>
  <div class="sale">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Total: R$ {{ sale.total }}</h2>
        <p>{{ sale.createdAt }}</p>
        <p>{{ payment_method }}</p>
      </div>
    </div>
    <div v-for="product in products" class="prodcuts" :key="product.id">
      <Product :product="product" :is-sale="false" />
    </div>
  </div>
</template>

<script>
import api from "../api";
import Sale from "../components/Sale.vue";
import Product from "../components/Product.vue";
export default {
  name: "SalesPage",
  data() {
    return {
      sale: {},
      sale_id: "",
      products_id: [],
      products: [],
      paymentMethod: "",
      payment_method: "",
    };
  },
  methods: {
    setId() {
      this.sale_id = this.$route.params.id;
    },
    setSale() {
      api.get(`/sale/${this.sale_id}`).then((response) => {
        this.sale = response.data;
        this.products_id = response.data.productId;
        this.paymentMethod = response.data.paymentMethod;
        switch (this.sale.paymentMethod) {
          case "credit_card":
            this.payment_method = "Cartão de Crédito";
            break;
          case "debit_card":
            this.payment_method = "Cartão de Débito";
            break;
          case "cash":
            this.payment_method = "Dinheiro";
            break;
          default:
            this.payment_method = "Não informado";
        }
        this.products_id.forEach((product) => {
          api.get(`/product/${product}`).then((response) => {
            this.products.push(response.data);
          });
        });
      });
    },
    getProducts() {
      this.products_id.forEach((id) => {
        api.get(`/product/${id}`).then((response) => {
          this.products.push(response.data);
        });
      });
    },
    voltar() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.setId();
    this.setSale();
    this.getProducts();
  },
  components: {
    Sale,
    Product,
  },
};
</script>
