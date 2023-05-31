<template>
  <div class="cart">
    <h2>OBS: clique na imagem para saber mais</h2>
    <br />
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> Gostaria de pagar? </v-card-text>
        <v-card-text>Total: R${{ totalValue }} </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="this.dialog = false"
            >Cancelar</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-btn color="primary" block @click="pay">Comprar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="product" v-for="product in products" :key="product.id">
      <img
        @click="gotoProduct(product.id)"
        :src="product.image"
        class="product-image"
      />
      <div class="atributos">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">R$ {{ product.price }}</div>
        <!-- <div v-if="product.description" class="product-desc">
          Sobre: {{ product.description }}
        </div> -->
      </div>
      <br />
      <button class="btn btn-error" @click="removeFromCart(product.id)">
        ❌
      </button>
    </div>
    <div class="total">
      <h2>Total: R$ {{ totalValue.toFixed(2) }}</h2>
    </div>
    <div class="payment">
      <h2>Forma de pagamento</h2>
      <select v-model="payment_method" class="select w-full max-w-xs">
        <option value="C">Cartão de crédito</option>
        <option value="debit_card">Cartão de débito</option>
        <option value="pix">Pix</option>
        <option value="cash">Dinheiro</option>
      </select>
      <button @click="buyCallback" class="btn" :class="buttonColor">
        Pagar
      </button>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: row;
}
.product-name {
  font-size: 20px;
  font-weight: bold;
}
.product-price {
  font-size: 20px;
  font-weight: bold;
}
.total {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
.product img {
  max-width: 100px;
}
.atributos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
}
.payment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.payment select {
  margin: 10px;
  border: 1px solid black;
}
</style>

<script>
import api from "../api";

export default {
  name: "Cart",
  data() {
    return {
      products: [],
      dialog: false,
      totalValue: 0,
      payment_method: "",
      buttonColor: "",
    };
  },
  methods: {
    gotoProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    removeFromCart(id) {
      this.products = this.products.filter((product) => product.id !== id);
      this.$store.commit("removeFromCart", id);
      this.calculateTotalValue();
    },
    calculateTotalValue() {
      this.totalValue = this.products.reduce(
        (total, product) => total + product.price,
        0
      );
    },
    buyCallback() {
      this.dialog = true;
    },
    pay() {
      const productsIds = this.$store.state.cart;
      const sale = {
        total: this.totalValue,
        payment_method: this.payment_method,
      };
      api
        .post(
          "/sale",
          {
            products_ids: productsIds,
            sale: sale,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.$store.commit("clearCart");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    colorButton() {
      if (this.products == 0) {
        this.buttonColor = "btn-disabled";
      } else {
        this.buttonColor = "btn-disabled";
      }
    },
  },
  mounted() {
    const productsIds = this.$store.state.cart;
    productsIds.forEach((id) => {
      api
        .get(`/product/${id}`)
        .then((res) => {
          this.products.push(res.data);
          this.calculateTotalValue();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>
