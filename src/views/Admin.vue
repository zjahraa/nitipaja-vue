<template>
      <div class="body-admin">
        <button class="submit-btn" @click="handleCreateAdmin">Tambah Admin</button>
          <table class="table-admin">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <br><br><br><br>
                <th class="has-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item , index) in itemlist" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
                <br>
                <td class="has-text-right">
                  <div class="button-group">
                    <button @click="deleteItem(item.id)" class="button is-danger ml-2">Delete</button>
                    <button @click="SendEmail(item.id)" class="button is-warning ml-2">Send Email</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
  </template>
  
  <script>
  import { useAuthState, db } from "../firebase";
  import { ref, onMounted } from "vue";
  import { collection, onSnapshot, doc, deleteDoc, query, orderBy } from "firebase/firestore";
  import { useRouter } from "vue-router";
  
  const datalistCollectionRef = collection(db, "CreateAdmin");
  const datalistCollectionQuery = query(datalistCollectionRef, orderBy("nama", "desc"));
  
  export default {
    name: "AdminPage",
    setup() {
      const { user } = useAuthState();
      const newItem = ref('');
      const itemlist = ref([]);
  
      onMounted(() => {
        let tmpArr = [];
        onSnapshot(datalistCollectionQuery, (querySnapshot) => {
          tmpArr = [];
          querySnapshot.forEach((doc) => {
            const tmpItem = {
              nama: doc.data().nama,
              email: doc.data().email,
              role: doc.data().role,
              id: doc.id,
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
          console.error("Error deleting document:", error);
        }
      };
  
      const SendEmail = () => {
        router.push("/Sendemail");
      };
  
      const router = useRouter();
  
      const handleCreateAdmin = () => {
        router.push("/createadmin");
      };
  
      return { user, itemlist, newItem, deleteItem, SendEmail, handleCreateAdmin };
    },
  };
  </script>
  
 <style>

.body-admin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.table-admin {
  width: 60%; /* Adjust as needed */
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ccc;
}

.table-admin th,
.table-admin td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;

}

.submit-btn {
  width: 150px; /* Adjust as needed */
  height: 40px;
  background-color: #4677D5;
  color: white;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
}
</style> 
  