import { createWebHistory, createRouter } from 'vue-router';
// import ContactBook from '@/views/ContactBook.vue';
// import {
//  getAuth
//   } from "firebase/auth";

// import Vue from "vue";
// import Router from "vue-router";
// import {app} from "../firebaseInit.js";
import { auth } from "../firebaseInit";
import Login from '@/views/Login.vue';
import Admin_UserList from '@/views/Admin_UserList.vue';
import Player_PlayGame from '@/views/Player_PlayGame.vue';
import Player_Easy_Leaderboard from '@/views/Player_Easy_Leaderboard.vue';
import Player_Medium_Leaderboard from '@/views/Player_Medium_Leaderboard.vue';
import Player_Hard_Leaderboard from '@/views/Player_Hard_Leaderboard.vue';
import Admin_Easy_Leaderboard from '@/views/Admin_Easy_Leaderboard.vue';
import Admin_Medium_Leaderboard from '@/views/Admin_Medium_Leaderboard.vue';
import Admin_Hard_Leaderboard from '@/views/Admin_Hard_Leaderboard.vue';
import Player_Personal_Score from '@/views/Player_Personal_Score.vue';


const routes = [
  {
    path: "/",
    name: "Player_PlayGame",
    component: Player_PlayGame,
    meta: {
      requireAuth: true,
    },
  },

  {
    path: "/Player_Personal_Score",
    name: "Player_Personal_Score",
    component: Player_Personal_Score,
    meta: {
      requireAuth: true,
    },
  },

  {
    path: "/Player_Easy_Leaderboard",
    name: "Player_Easy_Leaderboard",
    component: Player_Easy_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Player_Medium_Leaderboard",
    name: "Player_Medium_Leaderboard",
    component: Player_Medium_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Player_Hard_Leaderboard",
    name: "Player_Hard_Leaderboard",
    component: Player_Hard_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },

  {
    path: "/Admin_UserList",
    name: "Admin_UserList",
    component: Admin_UserList,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Admin_Easy_Leaderboard",
    name: "Admin_Easy_Leaderboard",
    component: Admin_Easy_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Admin_Medium_Leaderboard",
    name: "Admin_Medium_Leaderboard",
    component: Admin_Medium_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/Admin_Hard_Leaderboard",
    name: "Admin_Hard_Leaderboard",
    component: Admin_Hard_Leaderboard,
    meta: {
      requireAuth: true,
    },
  },


  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.path === "/Login" && auth.currentUser) {
      next("/");
      return;
    }
  
    if (
      to.matched.some((record) => record.meta.requireAuth) &&
      !auth.currentUser
    ) {
      next("/Login");
      return;
    }
    next();
  });

export default router;