<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    :class="login_alert_variant"
    v-show="login_show_alert"
  >
    {{ login_alert_msg }}
  </div>
  <!-- Login Form -->
  <Vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <Vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <Vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300"
    >
      Submit
    </button>
  </Vee-form>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    const loginSchema = {
      email: "required|email",
      password: "required|min:8|max:100",
    };
    return {
      loginSchema,
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_msg: "Please wait! We are logging you in.",
    };
  },

  methods: {
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = "bg-blue-500";
      this.login_alert_msg = "Please wait! We are logging you in.";

      try {
        await this.$store.dispatch("login", values);

        this.login_in_submission = false;
        this.login_alert_variant = "bg-green-500";
        this.login_alert_msg = "Success! You are now logged in.";
      } catch (err) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_msg = "Invalid login details.";

        return;
      }

      window.location.reload();
    },
  },
};
</script>
