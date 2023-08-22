<template>
    <div class="register">
      <div class="header">
        <img :src="logoImageUrl" alt="Logo" height="90" width="90" />
        <h1>Daftar</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="register-form">
        <input
          name="username"
          placeholder="Username"
          type="text"
          class="register-input"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          class="register-input"
        />
        <input
          name="birthOfDate"
          placeholder="Tanggal Lahir"
          type="text"
          class="register-input"
        />
        <input
          name="gender"
          placeholder="Jenis Kelamin"
          type="text"
          class="register-input"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          class="register-input"
        />
        <input
          name="phoneNo"
          placeholder="Nomor Telepon"
          type="text"
          class="register-input"
        />
        <br><br><br><br>
        <button type="submit" class="register-btn">Daftar</button>
      </form>
      <br><br><br>
      <div class="haveaccount">
        <p>Sudah punya akun? <router-link to="/login">Masuk</router-link></p>
      </div>
    </div>
  </template>
  <script>
  /* eslint-disable */ 
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
      name: "Register", // Nama komponen yang sesuai pedoman
      setup() {
          const auth = getAuth();
          const router = useRouter();
          const datalistCollectionRef = collection(db, "UserAdmin");
          
          const handleSubmit = async (e) => {
              const { username, email, birthOfDate, gender, password, phoneNo} = e.target.elements;
              try {
                  await addDoc(datalistCollectionRef, { // Menambahkan await di sini
                      username: username.value,
                      email: email.value,
                      birthOfDate: birthOfDate.value,
                      gender: gender.value,
                      password: password.value,
                      phoneNo: phoneNo.value,
                  });
                  await createUserWithEmailAndPassword(auth, email.value, password.value);
                  router.push("/");
              } catch (e) {
                  alert(e.message);
              }
          };
  
          return { 
            handleSubmit,
            logoImageUrl: 'https://shopper.nitipaja.online/storage/images/nitipaja.png',
         };
      },
  };
  </script>
  
  <style>
  /* Gaya Formulir Daftar */
  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  /* Gaya Header */
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header img {
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .header h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  
  /* Gaya Input */
  .register-input {
    width: 90%;
    height: 50px;
    font-size: 17px;
    padding: 0 25px;
    margin-bottom: 15px;
    border-radius: 10px; /* Penyesuaian lengkungan */
    border: 1px solid #ccc;
  }
  
  /* Gaya Tombol Daftar */
  .register-btn {
    width: 100%;
    height: 50px;
    border-radius: 30px;
    border: none;
    background-color: #4677d5;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .register-btn:hover {
    background-color: #345dbf;
  }
  
  /* Gaya Formulir */
  .register-form {
    width: 100%;
    max-width: 400px;
  }
  </style>
  