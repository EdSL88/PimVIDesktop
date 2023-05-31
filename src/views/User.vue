<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        alt="Shoes"
        class="w-24 rounded-full"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title justify-center">{{ user.name }}</h2>
      <p class="card-title justify-center">{{ user.email }}</p>
      <p class="card-title justify-center">CPF: {{ user.cpf }}</p>
      <p class="card-title justify-center">RG: {{ user.rg }}</p>
      <br />
      <div class="card-actions justify-end"><CadastroProduto /></div>
    </div>
  </div>

  <br />
  <div class="sales" v-for="sale in sales" :key="sale.id">
    <Sale :sale="sale" />
  </div>
</template>
<style scoped>
.user {
  display: flex;
  flex-direction: column;
}
.sales {
  display: flex;
  flex-direction: column;
}
.user * {
  margin: 10px;
}
</style>
<script>
import api from "../api";
import CadastroProduto from "../components/CadastroProduto.vue";
import Sale from "../components/Sale.vue";
export default {
  data() {
    return {
      dialog: false,
      logged: false,
      token: localStorage.token,
      user: {},
      sales: [],
    };
  },
  methods: {
    getSales() {
      api
        .get("/sale", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((sales) => {
          this.sales = sales.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    api
      .get("/user", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.getSales();
  },
  components: { CadastroProduto, Sale },
};
</script>
