<script>
/* eslint-disable */ 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const datalistCollectionRef = collection(db, "CreateAdmin");

    const handleSubmit = async (e) => {
      const { email, nama, role} = e.target.elements;
      try {
        addDoc(datalistCollectionRef, {
            nama: nama.value,
            email: email.value,
            role: role.value,
            id: uuidv4(),
        });
        // await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push("/Admin");
      } catch (e) {
        alert(e.message);
      }
    };

    return { handleSubmit };
  },
};
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.admin-table th,
.admin-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.admin-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.submit-button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: darkblue;
}

/* Add some styling to the form layout */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin: 0 auto;
}

/* Style for input fields */
input[type="text"],
input[type="email"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style for the submit button */
button[type="submit"] {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>

<!-- prettier-ignore -->
<template>
  <h1>Tambah admin</h1>
  <!-- username
email
nomorHp
tgl lahir
password
konfirm pwd
jenis kelamin -->

  <form @submit.prevent="handleSubmit">
    <input name="nama" placeholder="nama" type="text" /> <br/>
    <input name="email" placeholder="email" type="email" /><br/>
    <input name="role" placeholder="role" type="text" /><br/>
    <button type="submit">lanjut</button>
  </form>
</template>
