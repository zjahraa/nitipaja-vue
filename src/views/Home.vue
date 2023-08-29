<template>
  <div class="main-container">
    <div class="navbar">
      <!-- Navbar content -->
    </div>
    <main>
      <div class="body-content">
        <div class="container">
          <h2 class="table-title">Daftar Pesanan</h2>
          <table class="table is-bordered is-hoverable">
            <thead>
              <tr>
                <th>No</th>
                <th>Kategori</th>
                <th>Barang</th>
                <th>Jumlah Pesanan</th>
                <th>Tujuan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in itemlist" :key="item.id" :class="{'has-background-success-light' : item.done}">
                <td>{{ index + 1 }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.item }}</td>
                <td>{{ item.order }}</td>
                <td>{{ item.destination }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAuthState, db } from "../firebase";
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const datalistCollectionRef = collection(db, "Product");
const datalistCollectionQuery = query(datalistCollectionRef, orderBy("id", "desc"));

export default {
  name: "HomePage",
  setup() {
    const { user } = useAuthState();
    const itemlist = ref([]);
    const isDropdownOpen = ref(false);

    onMounted(() => {
      onSnapshot(datalistCollectionQuery, (querySnapshot) => {
        let tmpArr = [];
        querySnapshot.forEach((doc) => {
          const tmpItem = {
            id: doc.data().id,
            destination: doc.data().destination,
            category: doc.data().category,
            item: doc.data().item,
            order: doc.data().order
          };
          tmpArr.push(tmpItem);
        });
        itemlist.value = tmpArr;
      });
    });

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const logout = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return { user, itemlist, toggleDropdown, logout, isDropdownOpen };
  },
};
</script>

<style>
/* Gaya CSS untuk tampilan yang menarik */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.navbar {
  /* Gaya untuk bagian navbar */
}

.body-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 8px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  padding: 20px;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
}

.table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

/* Gaya lainnya */
</style>
