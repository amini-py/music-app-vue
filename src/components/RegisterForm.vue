<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    :class="reg_alert_variant"
    v-show="reg_show_alert"
  >
    {{ reg_alert_msg }}
  </div>
  <!-- Registration Form -->
  <Vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <Vee-field :bails="false" name="name" v-slot="{ field, errors }">
        <input
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">
          {{ error }}
        </div>
      </Vee-field>
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <Vee-field
        min="13"
        max="100"
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <Vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </Vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <Vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <Vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="none" disabled>-</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Iran">Iran</option>
      </Vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <Vee-field
        value="1"
        type="checkbox"
        name="tos"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300"
    >
      Submit
    </button>
  </Vee-form>
</template>
<script>
// import { auth, userCollection } from "@/includes/firebase";

export default {
  name: "RegisterForm",
  data() {
    const schema = {
      name: "required|min:3|max:100|alpha_spaces",
      email: "required|email",
      age: "required|min_value:13|max_value:100",
      password: "required|min:8|max:100",
      confirm_password: "confirmed:@password",
      country: "required|not_one_of:Iran",
      tos: "required",
    };

    const initial_values = {
      country: "none",
    };

    return {
      schema,
      initial_values,
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_msg: "bg-blue-500",
      reg_alert_variant: "Please wait! Account is being created!",
    };
  },

  methods: {
    async register(values) {
      console.log(values);
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait! Your account is being created.";

      try {
        await this.$store.dispatch("register", values);

        this.reg_in_submission = true;
        this.reg_alert_variant = "bg-green-500";
        this.reg_alert_msg = "Success! Your account has been created.";
      } catch (err) {
        this.reg_in_submission = true;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg = "An unexpected error occurred. Please try again later!";

        return;
      }

      window.location.reload();
    },
  },
};
</script>
