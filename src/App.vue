<template>
  <!-- Header -->
  <header-component />

  <!-- Auth -->
  <auth-modal />
  <!-- Router -->
  <Router-view></Router-view>
</template>

<script>
import HeaderComponent from "./components/Header-Component.vue";
import AuthModal from "./components/AuthModal.vue";

export default {
  name: "App-Parent-Component",
  components: { HeaderComponent, AuthModal },

  beforeCreate() {
    this.$store.dispatch("init_login");
  },
};
</script>
