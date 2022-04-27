<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <Router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</Router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <Router-link :to="{ name: 'about' }" class="px-2 text-white"
              >About</Router-link
            >
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <Router-link :to="{ name: 'manage' }" class="px-2 text-white"
                >Manage</Router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
/* eslint-disable no-constant-condition */
import { mapMutations, mapState } from "vuex";

export default {
  name: "header-component",
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    signOut() {
      this.$store.dispatch("signOut");
      if ((this.$router.name = "manage")) {
        this.$router.push({ name: "home" });
      }
    },
  },
  computed: {
    ...mapState(["userLoggedIn"]),
  },
};
</script>
