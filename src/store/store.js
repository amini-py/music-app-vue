import { createStore } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { auth, userCollection, storage } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false
  },
  mutations: {
    toggleAuthModal: state => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: state => {
      state.userLoggedIn = !state.userLoggedIn
    },
  },
  getters: {
    authModalShow: state => state.authModalShow,
  },
  actions: {
    async register({ commit }, values) {

      // Registering User
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)
      // Writing Documents
      await userCollection.doc(userCred.user.uid).set({
        // User Info
        email: values.email,
        password: values.password,
        age: values.age,
        country: values.country,
      });

      commit('toggleAuth');
    },
    async login({ commit }, values) {
      await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );

      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async signOut({ commit },) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
});