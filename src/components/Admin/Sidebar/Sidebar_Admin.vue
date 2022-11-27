<template>
  <div className="sidebar">
      <div className="top">
        <router-link :to="{ name: 'Login' }" class="nav-link">
          <span className="logo">The Admin Panel</span>
        </router-link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <router-link :to="{ name: 'Admin_UserList' }" class="nav-link">
            <!-- <router-link> -->
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Admin_UserList</span>
            </li>
          </router-link>
          
          <router-link :to="{ name: 'Admin_Easy_Leaderboard' }" class="nav-link">
            <!-- <router-link> -->
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Admin Easy Leaderboard</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Admin_Medium_Leaderboard' }" class="nav-link">
            <!-- <router-link> -->
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Admin_Medium_Leaderboard</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Admin_Hard_Leaderboard' }" class="nav-link">
            <!-- <router-link> -->
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Admin_Hard_Leaderboard</span>
            </li>
          </router-link>

          <li>
            <!-- <span>Logout</span> -->
            <button @click="logout" class="nav-link">Log out</button>
          </li>
      
        </ul>
      </div>
     
    </div>  
</template>

<script>
import "./sidebar.scss";

import { useStore } from "vuex";
export default {
  setup() {

    const store = useStore();
    const logout = () => {
      store.dispatch("logout");
    };
    return {
      logout
    };
  },
};

</script>

<style lang="scss">
.sidebar {
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;

  .top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #6439ff;
    }
  }

  hr {
    height: 0;
    border: 0.5px solid rgb(230, 227, 227);
  }

  .center {
    padding-left: 10px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      .title {
        font-size: 10px;
        font-weight: bold;
        color: #999;
        margin-top: 15px;
        margin-bottom: 5px;
      }

      li {
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: #ece8ff;
        }

        .icon {
          font-size: 18px;
          color: #7451f8;
        }

        span{
            font-size: 13px;
            font-weight: 600;
            color: #888;
            margin-left: 10px;
        }
      }
    }
  }

  .bottom{
      display: flex;
      align-items: center;
      margin: 10px;

      .colorOption{
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 1px solid #7451f8;
          cursor: pointer;
          margin: 5px;

          &:nth-child(1){
              background-color: whitesmoke;
          }
          &:nth-child(2){
              background-color: #333;
          }
          &:nth-child(3){
              background-color: darkblue;
          }
      }
  }
}

</style>