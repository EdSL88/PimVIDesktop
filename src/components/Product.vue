<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>{{ dialog_text }} </v-card-text>
        <v-card-actions>
          <v-btn color="btn btn-primary" block @click="dialog = false"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img :src="product.image" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h3 class="card-title">Categoria: {{ product.category }}</h3>
      <h2 class="card-title">{{ product.name }} || R$ {{ product.price }}</h2>
      <p>Desc: {{ product.description }}</p>
      <div v-if="isSale" class="card-actions justify-center">
        <button @click="addToCart(product.id)" class="btn btn-primary">
          Adicionar ao carrinho
        </button>
        <button @click="removeFromCart(product.id)" class="btn btn-secondary">
          Remover do carrinho
        </button>
      </div>
      <div v-if="!isSale" class="card-actions justify-center">
        <button @click="gotoProduct(product.id)" class="btn btn-primary">
          Ver produto
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script>
export default {
  data() {
    return {
      product: {},
      dialog: false,
      products_added: [],
      dialog_text: "",
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isSale: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    addToCart(id) {
      this.$store.commit("addToCart", id);
      this.dialog_text = `Produto adicionado ao carrinho!`;
      this.dialog = true;
      this.products_added = this.$store.state.cart;
    },
    removeFromCart(id) {
      this.$store.commit("removeFromCart", id);
      this.dialog_text = `Produto removido do carrinho!`;
      this.dialog = true;
      this.products_added = this.$store.state.cart;
    },
    gotoProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
