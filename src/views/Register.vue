<template>
  <div class="text-center">
    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>
            {{ registred ? "Registrado com sucesso" : "Erro ao registrar" }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="registred ? this.$router.push('/home') : (dialog = false)"
              >{{ registred ? "Entrar" : "Tentar Novamente" }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <form class="form" @submit.prevent="submitForm">
      <div class="icon">
        <font-awesome-icon icon="fa-solid fa-lock-open" />
      </div>
      <input
        class="input w-full max-w-xs input-bordered input-info"
        type="text"
        v-model="name"
        placeholder="Nome"
      />
      <input
        class="input w-full max-w-xs input-bordered input-primary"
        type="email"
        v-model="email"
        placeholder="Email"
      />
      <input
        class="input w-full max-w-xs input-bordered input-accent"
        type="text"
        v-model="cpf"
        placeholder="CPF"
      />
      <input
        class="input w-full max-w-xs input-bordered input-error"
        type="text"
        v-model="rg"
        placeholder="RG"
      />
      <input
        class="input w-full max-w-xs input-bordered input-secondary"
        type="password"
        v-model="password"
        placeholder="Senha"
      />
      <button class="btn btn-primary" type="submit">Registrar</button>
    </form>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
.form input {
  margin: 10px;
}
.form > .icon {
  font-size: 100px;
  margin: 10px;
}
</style>

<script>
import api from "../api";
export default {
  data() {
    return {
      dialog: false,
      email: "",
      name: "",
      password: "",
      rg: "",
      cpf: "",
      registred: false,
    };
  },
  methods: {
    submitForm() {
      api
        .post("/user", {
          email: this.email,
          password: this.password,
          name: this.name,
          rg: this.rg,
          cpf: this.cpf,
        })
        .then((response) => {
          console.log(response);
          this.registred = true;
          this.dialog = true;
        })
        .catch((error) => {
          console.log(error);
          this.dialog = true;
        });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>
