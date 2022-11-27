<template>
    <div className="list">
        <Sidebar_Admin />
        <div className="listContainer">
            <Admin_Navbar />
            <br />
            <Container>
                <!-- <Row>
                    <Col> -->

                <table class="table" striped bordered hover size="sm">
                    <thead class="t_heading">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Score</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(data, index) in users' :key='index'>
                            <td>{{ index + 1 }}</td>
                            <td>{{ data.Name }}</td>
                            <td>{{ data.email }}</td>
                            <td>{{ data.Score }}</td>
                            <td>
                                <a class='delete'>
                                    <span class="material-symbols-outlined"
                                        @click='del(userid[index], index + 1, data.uid)'>close</span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- </Col>
                </Row> -->
            </Container>
        </div>
    </div>
</template>

<script>
import Sidebar_Admin from "@/components/Admin/Sidebar/Sidebar_Admin.vue";
import Admin_Navbar from "@/components/Admin/Navbar/Admin_Navbar.vue";
import { db } from "../firebaseInit";
// import { collection } from "firebase/firestore"
// import { getDocs } from 'firebase/firestore'
import { doc, deleteDoc } from "firebase/firestore";
// import { mapMutations } from 'vuex'
import { getAuth } from 'firebase/auth'
// import { ref, onMounted } from 'vue';
import { collection, getDocs } from "firebase/firestore";

// const todosCollectionRef = collection(db, 'users_list');
// const todosCollectionQuery = query(todosCollectionRef, orderBy('Fullname', 'desc'));
// import UserList from "@/components/Admin/UserList/UserList.vue";
// import ContactList from "@/components/ContactList.vue";
// import { contactService } from "@/services/contact.service";
// import { Script } from "vm";

export default {
    name: 'AlluserView',
    components: {
        Sidebar_Admin,
        Admin_Navbar,
    },
    data() {
        return {
            users: [],
            userid: []
        }
    },
    mounted: function () {
        this.useloaduser()
    },
    methods: {
        del(id, index, uid) {
            const docRef = doc(db, "Leaderboard_Hard", id.toString());
            this.userid.splice(index - 1, 1)
            this.users.splice(index - 1, 1)
            deleteDoc(docRef)
                .then(() => {
                    alert("deleted successfully.")
                })
                .catch(error => {
                    console.log(error);
                })
            
            getAuth()
                .deleteUser(uid)
                .then(() => {
                    console.log('Successfully deleted user');
                })
                .catch((error) => {
                    console.log('Error deleting user:', error);
                });
        },

        async useloaduser() {
            const querySnapshot = await getDocs(collection(db, "Leaderboard_Hard"));
            querySnapshot.forEach((doc) => {
                this.userid.push(Object(doc.id))
                this.users.push(Object(doc.data()))
            });
        }

    }
}

</script>

<style lang="scss">
.list {
    display: flex;
    width: 100%;

    .listContainer {
        flex: 6;
    }
}
</style>

<style>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: cursive;
}

a {
    text-decoration: none;
}

.allusers {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
    flex: 0 0 50%;
    overflow: auto;
    overflow: scroll !important;
}

/* .table td ,.table th {
  padding: 1em;
  text-align: center;
  border-top:1px solid #200202 ;
}
.table td a{
  padding: .3em .1em;
  font-size: 1.1em;
  margin: 0.2em;
}
.table tbody tr:hover {
  background-color: #00b157;
} */
.delete,
.update {
    cursor: pointer
}

.btn {
    border: none;
    outline: none;
    background: white;
    padding-bottom: 20px;
    color: #090a09;
    font-size: 17px;
}

.btn:hover {
    color: red;
    border: none;
    outline: none;
}

.adduser {
    display: flex;
    position: absolute;
    text-align: start;
    top: 8%;
    left: 27%;
    color: red;
}

button {
    cursor: pointer;
}

@media only screen and (max-width:900px) {
    .adduser {
        display: flex;
        position: absolute;
        text-align: start;
        top: 8%;
        left: 7%
    }
}

@media only screen and (max-width:900px) {

    .table td,
    .table th {
        padding: 0.3em;
    }

    .allusers {
        display: flex;
        flex: 0 0 90%;
        overflow: auto;
    }
}
</style>