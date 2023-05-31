<script>
import NavbarComponent from "./NavbarComponent.vue";
export default {
  name: "Navbar",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      logged: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("setLoggedIn", false);
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<template>
  <div class="nav-bar">
    <NavbarComponent button-class="btn-primary" title="Home" link="/" />
    <NavbarComponent
      button-class="btn-accent"
      title="Login"
      v-if="!isLoggedIn"
      link="/login"
    />
    <NavbarComponent
      button-class="btn-error"
      title="Registrar"
      v-if="!isLoggedIn"
      link="/register"
    />
    <NavbarComponent
      button-class="btn-warning"
      title="🛒"
      v-if="isLoggedIn"
      link="/cart"
    />
    <NavbarComponent title="User" v-if="isLoggedIn" link="/user" />
    <button @click="logout" v-if="isLoggedIn" class="btn btn-error">
      Logout
    </button>
  </div>
</template>

<style>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  height: 50px;
}
.nav-bar * {
  margin: 0 10px;
}
</style>
