<template>
  <div class="text-center">
    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>
            {{
              isLoggedIn ? "Logado com sucesso" : "Usuario ou senha invalidos"
            }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="
                isLoggedIn ? this.$router.push('/user') : (dialog = false)
              "
              >{{ isLoggedIn ? "Ver Usuario" : "Tentar Novamente" }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <form class="form" @submit.prevent="submitForm">
      <div class="icon">
        <font-awesome-icon icon="fa-solid fa-lock" />
      </div>
      <input
        class="input w-full max-w-xs input-bordered input-primary"
        type="email"
        v-model="email"
        placeholder="Email"
      />
      <input
        class="input w-full max-w-xs input-bordered input-secondary"
        type="password"
        v-model="password"
        placeholder="Senha"
      />
      <button class="btn btn-primary" type="submit">Login</button>
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
      password: "",
      logged: false,
    };
  },
  methods: {
    submitForm() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      api
        .post("/user/login", formData)
        .then((response) => {
          console.log(response);
          if (response.data.access_token) {
            this.$store.commit("setLoggedIn", true);
            localStorage.token = response.data.access_token;
          } else {
            this.$store.commit("setLoggedIn", false);
          }
        })
        .catch((error) => {
          console.log(error);
          this.dialog = false;
        })
        .finally(() => {
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
