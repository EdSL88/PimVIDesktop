<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isCollapsed: true,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    buttonClass: {
      type: String,
      default: "btn-secondary",
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
<template>
  <router-link :to="link">
    <button :class="buttonClass" class="btn">{{ title }}</button>
  </router-link>
</template>
