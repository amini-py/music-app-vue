import { createStore } from 'vuex'
import { auth, userCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false
  },
  mutations: {
    toggleAuthModal: state => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn
    },
  },
  getters: {
    authModalShow: state => state.authModalShow,
  },
  actions: {
    async register({ commit }, values) {

      // Registering User
      await auth.createUserWithEmailAndPassword(values.email, values.password)
        .then(userCredential => {
          // Writing Documents
          userCollection.doc(userCredential.user.uid).set({
            // User Info
            email: values.email,
            password: values.password,
            age: values.age,
            country: values.country,
          });

          commit('toggleAuth')
        })
        .catch(err => {
          console.log("An unexpected error during registering your account!", err)
        })

    },


    async login({ commit }, values) {
      auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );

      commit('toggleAuth')
    }
  },
  init_login({ commit }) {
    const user = auth.currentUser;

    if (user) {
      commit('toggleAuth');
    }
  },
});