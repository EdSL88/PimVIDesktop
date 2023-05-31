<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="view">
    <Navbar class="navbar" /> <br />

    <router-view> </router-view>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
