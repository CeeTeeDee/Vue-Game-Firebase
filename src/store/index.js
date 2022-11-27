/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebaseInit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from "@firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
export default createStore({
  state: {
    user: null,
    //test
    usersDB:[]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },

      //test
      ADD_USERS(state, users){
        state.usersDB = users
      }
  },
  actions: {
    async login({ commit }, detailes) {
      const { email, password } = detailes;
      try {
        await signInWithEmailAndPassword(auth, email, password);


      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("user not found");
            break;
          case "auth/wrong-password":
            alert("somthing went wrong");
        }
        return;
      }
      commit("SET_USER", auth.currentUser);
      var test2 = getAuth().currentUser;
      const UserDoc = doc(db, "users_info", test2.uid);
        const docSnap = await getDoc(UserDoc);


        if(docSnap.data().User_role == "Admin"){
          router.push("/Admin_UserList");
        } else{
          router.push("/");
        }
     
    },
    async register({ commit }, detailes) {
      const { email, password, username } = detailes;
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        //for add to document
        var test = getAuth().currentUser;
        // const colRef = collection(db, 'users_info', test.uid.toString() )
        const colRef = doc(db, 'users_info', test.uid )

          // data to send
          const dataObj = {
            uid: test.uid,
            Fullname: username,
            email: email,
            pass: password,
            User_role: "Player"
          }
          // create document and return reference to it
          await setDoc(colRef, dataObj);

      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      commit("SET_USER", auth.currentUser);

      // router.push("/");
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});