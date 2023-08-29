<template>
  <div class="main-container">
    <div class="navbar">
      <!-- Navbar content -->
    </div>
    <div class="body-content">
      <div class="container">
        <table class="table is-bordered is-hoverable">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Profile</th>
              <th>Status</th>
              <!-- <th>Tanggal Lahir</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in itemlist" :key="item.id" :class="{'has-background-success-light' : item.done}">
              <td>{{ index + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.gender }}</td>
              <td><img :src="item.image" alt="User Image" width="50" height="50" /></td>
              <td>{{ item.status ? 'Jastiper' : 'Customer' }}</td>
              <!-- <td>{{ item.birth_of_date }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { useAuthState, db } from "../firebase";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, doc, deleteDoc, query, orderBy } from "firebase/firestore";

const datalistCollectionRef = collection(db, "User");
const datalistCollectionQuery = query(datalistCollectionRef, orderBy("name", "desc"));

export default {
  name: "UserView",
  setup() {
    const { user } = useAuthState();
    const itemlist = ref([]);

    onMounted(() => {
      const tmpArr = [];
      onSnapshot(datalistCollectionQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmpItem = {
            driver: doc.data().driver,
            email: doc.data().email,
            gender: doc.data().gender,
            image: doc.data().image,
            name: doc.data().name,
            status: doc.data().status,
            username: doc.data().username,
            birth_of_date: doc.data().birth_of_date
          };
          tmpArr.push(tmpItem);
        });
        itemlist.value = tmpArr;
      });
    });

    const deleteItem = async id => {
      try {
        await deleteDoc(doc(datalistCollectionRef, id));
        console.log("Deleted item with ID:", id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

    return { user, itemlist, deleteItem };
  },
};
</script>

<style>

.body-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  max-width: 660px; 
  margin: 0 auto; 
  padding: 50px;
  background-color: white;
  box-shadow: #4677D5 0px 0px 20px 0px;
  border-radius: 20px;
  text-align: center; /* Center the content within the container */
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 8px;
  text-align: center; /* Center content in table cells */
  border-bottom: 1px solid #ccc;
}

</style>