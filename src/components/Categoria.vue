<template>
  <div class="categoria">
    <h1>{{ cartegoria }}}</h1>
  </div>
  <div class="produtos">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Categoria",
  data() {
    return {
      cartegoria: "",
    };
  },
  props: {
    categoria: {
      type: String,
      required: true,
    },
  },
};
</script>
