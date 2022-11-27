// // import { createApp } from 'vue'
// import App from './App.vue'
// import app from './firebaseInit'
// import './assets/main.css'
// import Vue from 'vue';
// import store from './store';
// // createApp(App).mount('#app')
// import router from './router';
// // import vuetify from './plugins/vuetify';
// import { firestorePlugin } from 'vuefire';

// Vue.config.productionTip = false;

// Vue.use(firestorePlugin);

// // let app;

// // app.auth().onAuthStateChanged(user => {
// // //   store.dispatch('auth/fetchUser', user);
// //   if(!app) {
// //     new Vue({
// //     //   store,
// //       router,
// //     //   vuetify,
// //       render: h => h(App)
// //     }).$mount('#app');
// //   }
// // });

// app.auth().onAuthStateChanged(user => {
//     store.dispatch("fetchUser", user);
//   });
  
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount("#app");


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')